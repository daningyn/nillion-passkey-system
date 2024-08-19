const moment = require('moment');
const { CHALLENGE_TYPE, rpID, origin } = require('../../common/constant');
const { Challenge, User } = require('../../models');
const { verifyRegistrationResponse, verifyAuthenticationResponse } = require('@simplewebauthn/server');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const register = async (req, res) => {

    const { address, attestationResponse } = req.body;

    if (!address || !attestationResponse) {
        return res.status(400).send('Missing parameters');
    }

    const currentChallenge = await Challenge.findOne({
        where: {
            userAddress: address,
            type: CHALLENGE_TYPE.REGISTRATION,
            expiredAt: {
                [Op.gt]: moment().add(-2, 'minutes').toDate() // add more minutes to avoid lagging in request
            }
        }
    });

    if (!currentChallenge) {
        return res.status(400).send('Invalid challenge');
    }

    try {
        
        const verification = await verifyRegistrationResponse({
            response: attestationResponse,
            expectedChallenge: currentChallenge.challenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
            requireUserVerification: true,
        });

        const { verified, registrationInfo } = verification;

        if (verified) {
            const { credentialPublicKey, credentialID, counter } = registrationInfo;

            const user = await User.create({
                address,
                publicKey: Buffer.from(credentialPublicKey).toString(),
                credentialID: Buffer.from(credentialID).toString(),
                authenticator: registrationInfo,
                counter,
            });

            await Challenge.destroy({
                where: {
                    id: currentChallenge.id
                }
            });

            const token = jwt.sign({
                id: user.id,
                address
            }, process.env.JWT_KEY, { expiresIn: '7d' });

            res
            .status(200)
            .json({ 
                success: true,
                results: {
                    id: user.id,
                    address,
                    jwt: token
                }
            });
        } else {
            res.status(400).send('Verification failed');
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }

}

const loginPasskey = async (req, res) => {

    const { address, attestationResponse } = req.body;

    if (!address || !attestationResponse) {
        return res.status(400).send('Missing parameters');
    }

    const currentChallenge = await Challenge.findOne({
        where: {
            userAddress: address,
            type: CHALLENGE_TYPE.AUTHENTICATION,
            expiredAt: {
                [Op.gt]: moment().add(-2, 'minutes').toDate() // add more minutes to avoid lagging in request
            }
        }
    });

    if (!currentChallenge) {
        return res.status(400).send('Invalid challenge');
    }

    const user = await User.findOne({
        where: {
            address
        }
    });

    if (!user) {
        return res.status(400).send('User not found');
    }

    let verification;
    try {
        verification = await verifyAuthenticationResponse({
            response: attestationResponse,
            expectedChallenge: currentChallenge.challenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
            authenticator: {
                credentialID: user.credentialID,
                credentialPublicKey: new Uint8Array(Buffer.from(Object.values(user.authenticator.credentialPublicKey))),
                counter: user.counter
            },
            requireUserVerification: true
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: error.message });
    }

    const { verified } = verification;

    if (verified) {

        await Challenge.destroy({
            where: {
                id: currentChallenge.id
            }
        });

        const token = jwt.sign({
            id: user.id,
            address
        }, process.env.JWT_KEY, { expiresIn: '7d' });

        res
        .status(200)
        .json({ 
            success: true,
            results: {
                id: user.id,
                address,
                jwt: token
            }
        });

    } else {

        res.status(400).send('Verification failed');
        
    }

}

const authenticateJWT = async (req, res) => {

    const authorization = req.headers['authorization'];
    if (!authorization) return res.sendStatus(401).end();

    const token = authorization.split(' ')[1];
    if (!token) return res.sendStatus(401).end();

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return res.status(200).json(decoded);
    } catch (err) {
        return res.sendStatus(401).end();
    }
        
}

module.exports = {
    register,
    loginPasskey,
    authenticateJWT
}
