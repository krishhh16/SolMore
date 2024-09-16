export type Something = {
    "address": "8Z38GdBSu9hFQcJCXp8of6wb4e1m15fZR8rokGgtu3Wb",
    "metadata": {
      "name": "something",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "stake",
        "discriminator": [
          206,
          176,
          202,
          18,
          200,
          209,
          179,
          108
        ],
        "accounts": [
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "userState",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    117,
                    115,
                    101,
                    114,
                    95,
                    115,
                    116,
                    97,
                    116,
                    101
                  ]
                },
                {
                  "kind": "account",
                  "path": "user"
                }
              ]
            }
          },
          {
            "name": "stakingPool",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    115,
                    116,
                    97,
                    107,
                    105,
                    110,
                    103,
                    95,
                    112,
                    111,
                    111,
                    108
                  ]
                }
              ]
            }
          },
          {
            "name": "stakingPoolVault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    115,
                    116,
                    97,
                    107,
                    105,
                    110,
                    103,
                    95,
                    112,
                    111,
                    111,
                    108,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "unstake",
        "discriminator": [
          90,
          95,
          107,
          42,
          205,
          124,
          50,
          225
        ],
        "accounts": [
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "userState",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    117,
                    115,
                    101,
                    114,
                    95,
                    115,
                    116,
                    97,
                    116,
                    101
                  ]
                },
                {
                  "kind": "account",
                  "path": "user"
                }
              ]
            }
          },
          {
            "name": "stakingPool",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    115,
                    116,
                    97,
                    107,
                    105,
                    110,
                    103,
                    95,
                    112,
                    111,
                    111,
                    108
                  ]
                }
              ]
            }
          },
          {
            "name": "stakingPoolVault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    115,
                    116,
                    97,
                    107,
                    105,
                    110,
                    103,
                    95,
                    112,
                    111,
                    111,
                    108,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "userState",
        "discriminator": [
          72,
          177,
          85,
          249,
          76,
          167,
          186,
          126
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "noStakedAmount",
        "msg": "No staked amount found for this user."
      },
      {
        "code": 6001,
        "name": "notEnoughSolStaked",
        "msg": "Not enough SOL staked!"
      }
    ],
    "types": [
      {
        "name": "userState",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "amountStaked",
              "type": "u64"
            }
          ]
        }
      }
    ]
  };