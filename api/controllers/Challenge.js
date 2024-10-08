const crypto = require('crypto');
const { Op, where } = require('sequelize');
const moment = require('moment');
const { generateRegistrationOptions, generateAuthenticationOptions } = require('@simplewebauthn/server');
const { rpID, CHALLENGE_TYPE } = require('../../common/constant');
const { User, Challenge } = require('../../models');

const generateRegistrationChallenge = async (req, res) => {

    const { address } = req.body;
    if (!address) {
        res.status(400).json({ error: 'Missing Parameters' });
        return;
    }

    const user = await User.findOne({
        where: {
            address
        }
    });
    
    if (user) {
        return res.status(400).json({ error: 'User already registered' });
    }

    try {

        // Look for an existing challenge for user
        const currentChallenge = await Challenge.findOne({
            where: {
                userAddress: address,
                type: CHALLENGE_TYPE.REGISTRATION,
                expiredAt: {
                    [Op.gt]: moment().toDate()
                }
            }
        });

        if (!currentChallenge) {

            const challengeOptions = await generateRegistrationOptions({
                rpName: 'Nillion Passkey System',
                rpID,
                userName: address,
                attestationType: 'directs',
                authenticatorSelection: {
                    requireResidentKey: true,
                    userVerification: 'required',
                    authenticatorAttachment: 'platform'
                },
                pubKeyCredParams: [
                    {
                        alg: -8, // Ed25519
                        type: 'public-key',
                    }
                ],
                supportedAlgorithmIDs: [-7, -8, -257],
                timeout: 5 * 60 * 1000,
            });

            // Generate a new challenge with 5 minutes expiration
            await Challenge.create({
                userAddress: address,
                type: CHALLENGE_TYPE.REGISTRATION,
                challenge: challengeOptions.challenge,
                challengeRawData: JSON.stringify(challengeOptions),
                expiredAt: moment().add(5, 'minutes').toDate()
            });
            return res.json({ challengeOptions });
        }

        return res.json({ challengeOptions: JSON.parse(currentChallenge.challengeRawData) });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }

}

const generateAuthenChallenge = async (req, res) => {

    const { address } = req.body;
    if (!address) {
        res.status(400).json({ error: 'Missing Parameters' });
        return;
    }

    const user = await User.findOne({
        where: {
            address
        }
    });
    
    if (!user) {
        return res.status(400).json({ error: 'User has not registered yet!' });
    }

    try {

        // Look for an existing challenge for user
        const currentChallenge = await Challenge.findOne({
            where: {
                userAddress: address,
                type: CHALLENGE_TYPE.AUTHENTICATION,
                expiredAt: {
                    [Op.gt]: moment().toDate()
                }
            }
        });

        if (!currentChallenge) {

            const challengeOptions = await generateAuthenticationOptions({
                rpID,
                userVerification: 'required',
                allowCredentials: [
                    {
                        id: user.credentialID,
                        type: 'public-key'
                    },
                ],
                timeout: 5 * 60 * 1000,
            });

            // Generate a new challenge with 5 minutes expiration
            await Challenge.create({
                userAddress: address,
                type: CHALLENGE_TYPE.AUTHENTICATION,
                challenge: challengeOptions.challenge,
                challengeRawData: JSON.stringify(challengeOptions),
                expiredAt: moment().add(5, 'minutes').toDate()
            });
            return res.json({ challengeOptions });
        }

        return res.json({ challengeOptions: JSON.parse(currentChallenge.challengeRawData) });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }

}

module.exports = {
    generateRegistrationChallenge,
    generateAuthenChallenge
}
