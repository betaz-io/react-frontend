const contract = {
  testnet: {
    CONTRACT_ADDRESS: "5GXT1VadVHjW7vV1JxTjC1nxWBP3rgqiPy8RfeVvB2CcY2av",
    CONTRACT_ABI: {
      source: {
        hash: "0x651ddb63dfb80392bf03a046f89075d246657ba85240bce3f9976a499c07d587",
        language: "ink! 4.3.0",
        compiler: "rustc 1.75.0-nightly",
        build_info: {
          build_mode: "Debug",
          cargo_contract_version: "3.2.0",
          rust_toolchain: "nightly-x86_64-unknown-linux-gnu",
          wasm_opt_settings: {
            keep_debug_symbols: false,
            optimization_passes: "Z",
          },
        },
      },
      contract: {
        name: "sale",
        version: "1.0.0",
        authors: ["bet_a0 <admin@betA0.net>"],
      },
      spec: {
        constructors: [
          {
            args: [
              {
                label: "admin_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                label: "betaz_token_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [],
            label: "new",
            payable: false,
            returnType: {
              displayName: ["ink_primitives", "ConstructorResult"],
              type: 8,
            },
            selector: "0x9bae9d5e",
          },
        ],
        docs: [],
        environment: {
          accountId: {
            displayName: ["AccountId"],
            type: 0,
          },
          balance: {
            displayName: ["Balance"],
            type: 7,
          },
          blockNumber: {
            displayName: ["BlockNumber"],
            type: 4,
          },
          chainExtension: {
            displayName: ["ChainExtension"],
            type: 45,
          },
          hash: {
            displayName: ["Hash"],
            type: 38,
          },
          maxEventTopics: 4,
          timestamp: {
            displayName: ["Timestamp"],
            type: 6,
          },
        },
        events: [
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "fee",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "SalePoolBuyEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "pool_type",
                type: {
                  displayName: ["PoolType"],
                  type: 20,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "price",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "AddWhitelistEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "pool_type",
                type: {
                  displayName: ["PoolType"],
                  type: 20,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "price",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "UpdateWhitelistEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "pool_type",
                type: {
                  displayName: ["PoolType"],
                  type: 20,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
            ],
            docs: [],
            label: "RemoveWhitelistEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "pool_type",
                type: {
                  displayName: ["PoolType"],
                  type: 20,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buy_amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "purchased_amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "WhitelistBuyEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "contract_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "MintTokenEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "contract_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "BurnTokenEvent",
          },
        ],
        lang_error: {
          displayName: ["ink", "LangError"],
          type: 9,
        },
        messages: [
          {
            args: [
              {
                label: "admin_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                label: "betaz_token_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [" Function init"],
            label: "initialize",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xf2f6dba3",
          },
          {
            args: [],
            default: false,
            docs: [" Function changes state"],
            label: "SalePoolTrait::change_state",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xf778b5ed",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetWhitelistInfoInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "account",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetWhitelistInfoInput2",
                  ],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [" Get whitelist Info"],
            label: "SalePoolTrait::get_whitelist_info",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 21,
            },
            selector: "0xa8e356b8",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: ["salepooltrait_external", "AddWhitelistInput1"],
                  type: 20,
                },
              },
              {
                label: "account",
                type: {
                  displayName: ["salepooltrait_external", "AddWhitelistInput2"],
                  type: 0,
                },
              },
              {
                label: "amount",
                type: {
                  displayName: ["salepooltrait_external", "AddWhitelistInput3"],
                  type: 7,
                },
              },
              {
                label: "price",
                type: {
                  displayName: ["salepooltrait_external", "AddWhitelistInput4"],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::add_whitelist",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xec2a4567",
          },
          {
            args: [
              {
                label: "betaz_token_address",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "SetBetazTokenAddressInput1",
                  ],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::set_betaz_token_address",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xd4d39707",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetPoolSaleTotalRemainingAmountInput1",
                  ],
                  type: 20,
                },
              },
            ],
            default: false,
            docs: [" Get pool sale info total remaining amount"],
            label: "SalePoolTrait::get_pool_sale_total_remaining_amount",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 24,
            },
            selector: "0x84bb77f5",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetAccountByPoolTypeInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "index",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetAccountByPoolTypeInput2",
                  ],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [" Get account in pool type"],
            label: "SalePoolTrait::get_account_by_pool_type",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 26,
            },
            selector: "0x924067e7",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "buy_status",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput2",
                  ],
                  type: 3,
                },
              },
              {
                label: "end_time_buy",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput3",
                  ],
                  type: 6,
                },
              },
              {
                label: "total_amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput4",
                  ],
                  type: 7,
                },
              },
              {
                label: "total_purchased_amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput5",
                  ],
                  type: 7,
                },
              },
              {
                label: "price",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput6",
                  ],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [" update pool info"],
            label: "SalePoolTrait::update_sale_pool_info_pool_type",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xca5443a1",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "buy_status",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput2",
                  ],
                  type: 3,
                },
              },
              {
                label: "end_time_buy",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput3",
                  ],
                  type: 6,
                },
              },
              {
                label: "total_amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput4",
                  ],
                  type: 7,
                },
              },
              {
                label: "total_purchased_amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput5",
                  ],
                  type: 7,
                },
              },
              {
                label: "price",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput6",
                  ],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::add_pool_by_pool_type",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xdaf5bf6c",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddMultiWhitelistsInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "accounts",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddMultiWhitelistsInput2",
                  ],
                  type: 28,
                },
              },
              {
                label: "amounts",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddMultiWhitelistsInput3",
                  ],
                  type: 29,
                },
              },
              {
                label: "prices",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddMultiWhitelistsInput4",
                  ],
                  type: 29,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::add_multi_whitelists",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xa78d8747",
          },
          {
            args: [],
            default: false,
            docs: [" Get bet az token contract"],
            label: "SalePoolTrait::get_betaz_token_address",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 30,
            },
            selector: "0xd7a42be6",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateMultiWhitelistsInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "accounts",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateMultiWhitelistsInput2",
                  ],
                  type: 28,
                },
              },
              {
                label: "amounts",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateMultiWhitelistsInput3",
                  ],
                  type: 29,
                },
              },
              {
                label: "prices",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateMultiWhitelistsInput4",
                  ],
                  type: 29,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::update_multi_whitelists",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0x455f94b0",
          },
          {
            args: [
              {
                label: "amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "BuyWithSalePoolInput1",
                  ],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::buy_with_sale_pool",
            mutates: true,
            payable: true,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0x28aede93",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetTotalAccountByPoolTypeInput1",
                  ],
                  type: 20,
                },
              },
            ],
            default: false,
            docs: [" Get total account in pool type"],
            label: "SalePoolTrait::get_total_account_by_pool_type",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 31,
            },
            selector: "0x2a278862",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: ["salepooltrait_external", "WhitelistBuyInput1"],
                  type: 20,
                },
              },
              {
                label: "amount",
                type: {
                  displayName: ["salepooltrait_external", "WhitelistBuyInput2"],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::whitelist_buy",
            mutates: true,
            payable: true,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0x86301e41",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetPoolSaleInfoInput1",
                  ],
                  type: 20,
                },
              },
            ],
            default: false,
            docs: [" Get pool sale info"],
            label: "SalePoolTrait::get_pool_sale_info",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 32,
            },
            selector: "0xc3564970",
          },
          {
            args: [],
            default: false,
            docs: [],
            label: "Ownable::renounce_ownership",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 35,
            },
            selector: "0x5e228753",
          },
          {
            args: [
              {
                label: "new_owner",
                type: {
                  displayName: ["ownable_external", "TransferOwnershipInput1"],
                  type: 27,
                },
              },
            ],
            default: false,
            docs: [],
            label: "Ownable::transfer_ownership",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 35,
            },
            selector: "0x11f43efd",
          },
          {
            args: [],
            default: false,
            docs: [],
            label: "Ownable::owner",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 26,
            },
            selector: "0x4fa43c8c",
          },
          {
            args: [],
            default: false,
            docs: [],
            label: "Pausable::paused",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 37,
            },
            selector: "0xd123ce11",
          },
          {
            args: [
              {
                label: "new_code_hash",
                type: {
                  displayName: ["upgradeable_external", "SetCodeHashInput1"],
                  type: 38,
                },
              },
            ],
            default: false,
            docs: [],
            label: "Upgradeable::set_code_hash",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 39,
            },
            selector: "0x1700ae80",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "GrantRoleInput1"],
                  type: 4,
                },
              },
              {
                label: "account",
                type: {
                  displayName: ["accesscontrol_external", "GrantRoleInput2"],
                  type: 27,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::grant_role",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 42,
            },
            selector: "0x4ac062fd",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "RevokeRoleInput1"],
                  type: 4,
                },
              },
              {
                label: "account",
                type: {
                  displayName: ["accesscontrol_external", "RevokeRoleInput2"],
                  type: 27,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::revoke_role",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 42,
            },
            selector: "0x6e4f0991",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "RenounceRoleInput1"],
                  type: 4,
                },
              },
              {
                label: "account",
                type: {
                  displayName: ["accesscontrol_external", "RenounceRoleInput2"],
                  type: 27,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::renounce_role",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 42,
            },
            selector: "0xeaf1248a",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "GetRoleAdminInput1"],
                  type: 4,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::get_role_admin",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 44,
            },
            selector: "0x83da3bb2",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "HasRoleInput1"],
                  type: 4,
                },
              },
              {
                label: "address",
                type: {
                  displayName: ["accesscontrol_external", "HasRoleInput2"],
                  type: 27,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::has_role",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 37,
            },
            selector: "0xc1d9ac18",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: [
                    "accesscontrolenumerable_external",
                    "GetRoleMemberInput1",
                  ],
                  type: 4,
                },
              },
              {
                label: "index",
                type: {
                  displayName: [
                    "accesscontrolenumerable_external",
                    "GetRoleMemberInput2",
                  ],
                  type: 4,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControlEnumerable::get_role_member",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 26,
            },
            selector: "0x163469e0",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: [
                    "accesscontrolenumerable_external",
                    "GetRoleMemberCountInput1",
                  ],
                  type: 4,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControlEnumerable::get_role_member_count",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 44,
            },
            selector: "0xf1b1a9d7",
          },
        ],
      },
      storage: {
        root: {
          layout: {
            struct: {
              fields: [
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            root: {
                              layout: {
                                enum: {
                                  dispatchKey: "0x6f713913",
                                  name: "Option",
                                  variants: {
                                    0: {
                                      fields: [],
                                      name: "None",
                                    },
                                    1: {
                                      fields: [
                                        {
                                          layout: {
                                            leaf: {
                                              key: "0x6f713913",
                                              ty: 0,
                                            },
                                          },
                                          name: "0",
                                        },
                                      ],
                                      name: "Some",
                                    },
                                  },
                                },
                              },
                              root_key: "0x6f713913",
                            },
                          },
                          name: "owner",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "ownable",
                },
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0xec3485f7",
                                  ty: 3,
                                },
                              },
                              root_key: "0xec3485f7",
                            },
                          },
                          name: "paused",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "pausable",
                },
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0x1f2cf4ac",
                                  ty: 4,
                                },
                              },
                              root_key: "0x1f2cf4ac",
                            },
                          },
                          name: "admin_roles",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0x8150f558",
                                  ty: 5,
                                },
                              },
                              root_key: "0x8150f558",
                            },
                          },
                          name: "members",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "access",
                },
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0x1eb9f2a8",
                                  ty: 4,
                                },
                              },
                              root_key: "0x1eb9f2a8",
                            },
                          },
                          name: "admin_roles",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                enum: {
                                  dispatchKey: "0x869d6fc0",
                                  name: "Option",
                                  variants: {
                                    0: {
                                      fields: [],
                                      name: "None",
                                    },
                                    1: {
                                      fields: [
                                        {
                                          layout: {
                                            leaf: {
                                              key: "0x869d6fc0",
                                              ty: 0,
                                            },
                                          },
                                          name: "0",
                                        },
                                      ],
                                      name: "Some",
                                    },
                                  },
                                },
                              },
                              root_key: "0x869d6fc0",
                            },
                          },
                          name: "role_members",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "enumerable",
                },
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: "0x00000000",
                              ty: 0,
                            },
                          },
                          name: "admin_address",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x00000000",
                              ty: 0,
                            },
                          },
                          name: "betaz_token_address",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                struct: {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 3,
                                        },
                                      },
                                      name: "buy_status",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 6,
                                        },
                                      },
                                      name: "end_time_buy",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 7,
                                        },
                                      },
                                      name: "total_amount",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 7,
                                        },
                                      },
                                      name: "total_purchased_amount",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 7,
                                        },
                                      },
                                      name: "price",
                                    },
                                  ],
                                  name: "PoolSaleInfo",
                                },
                              },
                              root_key: "0x3b8bc786",
                            },
                          },
                          name: "pool_sale_info",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0x9c3ce6c7",
                                  ty: 0,
                                },
                              },
                              root_key: "0x9c3ce6c7",
                            },
                          },
                          name: "whitelist_account",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                struct: {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0xeec0ef40",
                                          ty: 7,
                                        },
                                      },
                                      name: "amount",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0xeec0ef40",
                                          ty: 7,
                                        },
                                      },
                                      name: "price",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0xeec0ef40",
                                          ty: 7,
                                        },
                                      },
                                      name: "purchased_amount",
                                    },
                                  ],
                                  name: "WhitelistInfo",
                                },
                              },
                              root_key: "0xeec0ef40",
                            },
                          },
                          name: "whitelist",
                        },
                        {
                          layout: {
                            enum: {
                              dispatchKey: "0x00000000",
                              name: "Option",
                              variants: {
                                0: {
                                  fields: [],
                                  name: "None",
                                },
                                1: {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x00000000",
                                          ty: 5,
                                        },
                                      },
                                      name: "0",
                                    },
                                  ],
                                  name: "Some",
                                },
                              },
                            },
                          },
                          name: "_reserved",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "data",
                },
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            enum: {
                              dispatchKey: "0x00000000",
                              name: "Option",
                              variants: {
                                0: {
                                  fields: [],
                                  name: "None",
                                },
                                1: {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x00000000",
                                          ty: 5,
                                        },
                                      },
                                      name: "0",
                                    },
                                  ],
                                  name: "Some",
                                },
                              },
                            },
                          },
                          name: "_reserved",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "admin_data",
                },
              ],
              name: "SalePoolContract",
            },
          },
          root_key: "0x00000000",
        },
      },
      types: [
        {
          id: 0,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    type: 1,
                    typeName: "[u8; 32]",
                  },
                ],
              },
            },
            path: ["ink_primitives", "types", "AccountId"],
          },
        },
        {
          id: 1,
          type: {
            def: {
              array: {
                len: 32,
                type: 2,
              },
            },
          },
        },
        {
          id: 2,
          type: {
            def: {
              primitive: "u8",
            },
          },
        },
        {
          id: 3,
          type: {
            def: {
              primitive: "bool",
            },
          },
        },
        {
          id: 4,
          type: {
            def: {
              primitive: "u32",
            },
          },
        },
        {
          id: 5,
          type: {
            def: {
              tuple: [],
            },
          },
        },
        {
          id: 6,
          type: {
            def: {
              primitive: "u64",
            },
          },
        },
        {
          id: 7,
          type: {
            def: {
              primitive: "u128",
            },
          },
        },
        {
          id: 8,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 9,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 1,
                    name: "CouldNotReadInput",
                  },
                ],
              },
            },
            path: ["ink_primitives", "LangError"],
          },
        },
        {
          id: 10,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 11,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 11,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 11,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 12,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 12,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 12,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 0,
                    name: "Custom",
                  },
                  {
                    index: 1,
                    name: "OnlyOwner",
                  },
                  {
                    index: 2,
                    name: "OnlyAdmin",
                  },
                  {
                    index: 3,
                    name: "InvalidCaller",
                  },
                  {
                    index: 4,
                    name: "OnlyMinterCanMint",
                  },
                  {
                    index: 5,
                    name: "NotApproved",
                  },
                  {
                    index: 6,
                    name: "CannotTransfer",
                  },
                  {
                    index: 7,
                    name: "CannotMint",
                  },
                  {
                    index: 8,
                    name: "InvalidBuyTokensStatus",
                  },
                  {
                    index: 9,
                    name: "InvalidRewardTokensStatus",
                  },
                  {
                    index: 10,
                    name: "InsufficientAllowanceToLend",
                  },
                  {
                    index: 11,
                    name: "NotEnoughBalance",
                  },
                  {
                    index: 12,
                    name: "WithdrawFeeError",
                  },
                  {
                    index: 13,
                    name: "MaxBuyTokenAmount",
                  },
                  {
                    index: 14,
                    name: "TokensCanNotPurchased",
                  },
                  {
                    index: 15,
                    name: "TransferFailed",
                  },
                  {
                    index: 16,
                    name: "AlreadyInit",
                  },
                  {
                    index: 17,
                    name: "NotOwner",
                  },
                  {
                    index: 18,
                    name: "BetNotFinalized",
                  },
                  {
                    index: 19,
                    name: "CallerIsNotAdmin",
                  },
                  {
                    index: 20,
                    name: "InvalidInput",
                  },
                  {
                    index: 21,
                    name: "BetNotExist",
                  },
                  {
                    index: 22,
                    name: "HoldAmountPlayerNotExist",
                  },
                  {
                    index: 23,
                    name: "NoAmount",
                  },
                  {
                    index: 24,
                    name: "InvalidBalanceAndAllowance",
                  },
                  {
                    index: 25,
                    name: "InvalidUnstakedAmount",
                  },
                  {
                    index: 26,
                    name: "NotTimeToUnstaked",
                  },
                  {
                    index: 27,
                    name: "NoStakerFound",
                  },
                  {
                    index: 28,
                    name: "NotStaked",
                  },
                  {
                    index: 29,
                    name: "InvalidTotalStake",
                  },
                  {
                    index: 30,
                    name: "CallerNotRequestUnstake",
                  },
                  {
                    index: 31,
                    name: "ClaimMustBeFalse",
                  },
                  {
                    index: 32,
                    name: "RewardStarted",
                  },
                  {
                    index: 33,
                    name: "RewardNotStarted",
                  },
                  {
                    index: 34,
                    name: "InvalidInputRatio",
                  },
                  {
                    index: 35,
                    name: "NotTimeBuyToken",
                  },
                  {
                    index: 36,
                    name: "CannotBuyAtThisTime",
                  },
                  {
                    index: 37,
                    name: "NotTimeToFinalize",
                  },
                  {
                    index: 38,
                    name: "WhitelistNotExists",
                  },
                  {
                    index: 39,
                    name: "PoolNotExists",
                  },
                  {
                    index: 40,
                    name: "InvalidWhitelistData",
                  },
                  {
                    index: 41,
                    name: "WhitelistInfoExist",
                  },
                  {
                    index: 42,
                    name: "WhitelistBuyerPurchased",
                  },
                  {
                    index: 43,
                    name: "SalePoolPrurchased",
                  },
                  {
                    index: 44,
                    name: "PoolPrurchased",
                  },
                  {
                    index: 45,
                    name: "InvalidEndTime",
                  },
                  {
                    index: 46,
                    name: "NotTokenOwner",
                  },
                  {
                    index: 47,
                    name: "CannotIncreaseLastTokenId",
                  },
                  {
                    index: 48,
                    name: "CannotSetAttributes",
                  },
                  {
                    index: 49,
                    name: "SessionNotExists",
                  },
                  {
                    index: 50,
                    name: "SessionIsExists",
                  },
                  {
                    index: 51,
                    name: "BetIsExists",
                  },
                  {
                    index: 52,
                    name: "SessionNotCompleted",
                  },
                  {
                    index: 53,
                    name: "SessionNotFinished",
                  },
                  {
                    index: 54,
                    name: "SessionNotProcessed",
                  },
                  {
                    index: 55,
                    name: "YouAreNotWinner",
                  },
                  {
                    index: 56,
                    name: "InvalidState",
                  },
                  {
                    index: 57,
                    name: "SessionNotTicketWin",
                  },
                  {
                    index: 58,
                    name: "NftIsUsed",
                  },
                  {
                    index: 59,
                    name: "NftIsNotUsed",
                  },
                  {
                    index: 60,
                    name: "CannotBurn",
                  },
                  {
                    index: 61,
                    name: "NextSessionsNotExists",
                  },
                  {
                    index: 62,
                    name: "AddSessionFailed",
                  },
                  {
                    index: 63,
                    name: "InvalidFee",
                  },
                  {
                    index: 64,
                    name: "PoolIsExists",
                  },
                  {
                    index: 65,
                    name: "InvalidTotalPurchasedAmount",
                  },
                  {
                    index: 66,
                    name: "TicketAmountLimitReached",
                  },
                  {
                    index: 67,
                    name: "NotTimeToFinalized",
                  },
                  {
                    index: 68,
                    name: "CallerDoNotHaveVoting",
                  },
                  {
                    index: 69,
                    name: "SetPoolRationFailed",
                  },
                  {
                    index: 70,
                    name: "FailToDecreaseClaimableReward",
                  },
                  {
                    index: 71,
                    name: "RewardNotAdded",
                  },
                  {
                    index: 72,
                    name: "ChainlinkRequestIdIsExists",
                  },
                  {
                    fields: [
                      {
                        type: 14,
                        typeName: "OwnableError",
                      },
                    ],
                    index: 73,
                    name: "OwnableError",
                  },
                  {
                    fields: [
                      {
                        type: 15,
                        typeName: "AccessControlError",
                      },
                    ],
                    index: 74,
                    name: "AccessControlError",
                  },
                  {
                    fields: [
                      {
                        type: 16,
                        typeName: "PSP22Error",
                      },
                    ],
                    index: 75,
                    name: "PSP22Error",
                  },
                  {
                    fields: [
                      {
                        type: 18,
                        typeName: "PSP34Error",
                      },
                    ],
                    index: 76,
                    name: "PSP34Error",
                  },
                  {
                    fields: [
                      {
                        type: 19,
                        typeName: "PausableError",
                      },
                    ],
                    index: 77,
                    name: "PausableError",
                  },
                  {
                    index: 78,
                    name: "CheckedOperations",
                  },
                ],
              },
            },
            path: ["bet_a0", "traits", "error", "Error"],
          },
        },
        {
          id: 13,
          type: {
            def: {
              primitive: "str",
            },
          },
        },
        {
          id: 14,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "CallerIsNotOwner",
                  },
                  {
                    index: 1,
                    name: "NewOwnerIsNotSet",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "ownable",
              "OwnableError",
            ],
          },
        },
        {
          id: 15,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "InvalidCaller",
                  },
                  {
                    index: 1,
                    name: "MissingRole",
                  },
                  {
                    index: 2,
                    name: "RoleRedundant",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "access_control",
              "AccessControlError",
            ],
          },
        },
        {
          id: 16,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 0,
                    name: "Custom",
                  },
                  {
                    index: 1,
                    name: "InsufficientBalance",
                  },
                  {
                    index: 2,
                    name: "InsufficientAllowance",
                  },
                  {
                    index: 3,
                    name: "RecipientIsNotSet",
                  },
                  {
                    index: 4,
                    name: "SenderIsNotSet",
                  },
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 5,
                    name: "SafeTransferCheckFailed",
                  },
                  {
                    index: 6,
                    name: "PermitInvalidSignature",
                  },
                  {
                    index: 7,
                    name: "PermitExpired",
                  },
                  {
                    fields: [
                      {
                        type: 17,
                        typeName: "NoncesError",
                      },
                    ],
                    index: 8,
                    name: "NoncesError",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "psp22",
              "PSP22Error",
            ],
          },
        },
        {
          id: 17,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 0,
                        typeName: "AccountId",
                      },
                      {
                        type: 6,
                        typeName: "u64",
                      },
                    ],
                    index: 0,
                    name: "InvalidAccountNonce",
                  },
                  {
                    index: 1,
                    name: "NonceOverflow",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "nonces",
              "NoncesError",
            ],
          },
        },
        {
          id: 18,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 0,
                    name: "Custom",
                  },
                  {
                    index: 1,
                    name: "SelfApprove",
                  },
                  {
                    index: 2,
                    name: "NotApproved",
                  },
                  {
                    index: 3,
                    name: "TokenExists",
                  },
                  {
                    index: 4,
                    name: "TokenNotExists",
                  },
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 5,
                    name: "SafeTransferCheckFailed",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "psp34",
              "PSP34Error",
            ],
          },
        },
        {
          id: 19,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "Paused",
                  },
                  {
                    index: 1,
                    name: "NotPaused",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "pausable",
              "PausableError",
            ],
          },
        },
        {
          id: 20,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "Sale",
                  },
                  {
                    index: 1,
                    name: "PrivateInvestment",
                  },
                  {
                    index: 2,
                    name: "AirdropAndMarketing",
                  },
                  {
                    index: 3,
                    name: "Team",
                  },
                  {
                    index: 4,
                    name: "Development",
                  },
                ],
              },
            },
            path: ["bet_a0", "impls", "sale", "data", "PoolType"],
          },
        },
        {
          id: 21,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 22,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 22,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 22,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "None",
                  },
                  {
                    fields: [
                      {
                        type: 23,
                      },
                    ],
                    index: 1,
                    name: "Some",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 23,
              },
            ],
            path: ["Option"],
          },
        },
        {
          id: 23,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    name: "amount",
                    type: 7,
                    typeName: "Balance",
                  },
                  {
                    name: "price",
                    type: 7,
                    typeName: "Balance",
                  },
                  {
                    name: "purchased_amount",
                    type: 7,
                    typeName: "Balance",
                  },
                ],
              },
            },
            path: ["bet_a0", "impls", "sale", "data", "WhitelistInfo"],
          },
        },
        {
          id: 24,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 25,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 25,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 25,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "None",
                  },
                  {
                    fields: [
                      {
                        type: 7,
                      },
                    ],
                    index: 1,
                    name: "Some",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 7,
              },
            ],
            path: ["Option"],
          },
        },
        {
          id: 26,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 27,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 27,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 27,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "None",
                  },
                  {
                    fields: [
                      {
                        type: 0,
                      },
                    ],
                    index: 1,
                    name: "Some",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 0,
              },
            ],
            path: ["Option"],
          },
        },
        {
          id: 28,
          type: {
            def: {
              sequence: {
                type: 0,
              },
            },
          },
        },
        {
          id: 29,
          type: {
            def: {
              sequence: {
                type: 7,
              },
            },
          },
        },
        {
          id: 30,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 0,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 0,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 31,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 7,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 7,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 32,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 33,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 33,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 33,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "None",
                  },
                  {
                    fields: [
                      {
                        type: 34,
                      },
                    ],
                    index: 1,
                    name: "Some",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 34,
              },
            ],
            path: ["Option"],
          },
        },
        {
          id: 34,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    name: "buy_status",
                    type: 3,
                    typeName: "bool",
                  },
                  {
                    name: "end_time_buy",
                    type: 6,
                    typeName: "Timestamp",
                  },
                  {
                    name: "total_amount",
                    type: 7,
                    typeName: "Balance",
                  },
                  {
                    name: "total_purchased_amount",
                    type: 7,
                    typeName: "Balance",
                  },
                  {
                    name: "price",
                    type: 7,
                    typeName: "Balance",
                  },
                ],
              },
            },
            path: ["bet_a0", "impls", "sale", "data", "PoolSaleInfo"],
          },
        },
        {
          id: 35,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 36,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 36,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 36,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 14,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 14,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 37,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 3,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 3,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 38,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    type: 1,
                    typeName: "[u8; 32]",
                  },
                ],
              },
            },
            path: ["ink_primitives", "types", "Hash"],
          },
        },
        {
          id: 39,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 40,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 40,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 40,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 41,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 41,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 41,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 0,
                    name: "Custom",
                  },
                  {
                    index: 1,
                    name: "SetCodeHashFailed",
                  },
                  {
                    fields: [
                      {
                        type: 14,
                        typeName: "OwnableError",
                      },
                    ],
                    index: 2,
                    name: "OwnableError",
                  },
                  {
                    fields: [
                      {
                        type: 15,
                        typeName: "AccessControlError",
                      },
                    ],
                    index: 3,
                    name: "AccessControlError",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "upgradeable",
              "UpgradeableError",
            ],
          },
        },
        {
          id: 42,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 43,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 43,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 43,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 15,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 15,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 44,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 4,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 4,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 45,
          type: {
            def: {
              variant: {},
            },
            path: ["ink_env", "types", "NoChainExtension"],
          },
        },
      ],
      version: "4",
    },
  },
  mainnet: {
    CONTRACT_ADDRESS: "5GoKUica2tYRLZdgksy9Srs3Bm9seA4zaDBvQ1TQVpUByxxg",
    CONTRACT_ABI: {
      source: {
        hash: "0xe5bc6fc7fc1af0c375379a308a30f73e5b40e7a0a10c095974ab005ef43c2cfc",
        language: "ink! 4.3.0",
        compiler: "rustc 1.75.0-nightly",
        build_info: {
          build_mode: "Debug",
          cargo_contract_version: "3.2.0",
          rust_toolchain: "nightly-x86_64-unknown-linux-gnu",
          wasm_opt_settings: {
            keep_debug_symbols: false,
            optimization_passes: "Z",
          },
        },
      },
      contract: {
        name: "sale",
        version: "1.0.0",
        authors: ["bet_a0 <admin@betA0.net>"],
      },
      spec: {
        constructors: [
          {
            args: [
              {
                label: "admin_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                label: "betaz_token_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [],
            label: "new",
            payable: false,
            returnType: {
              displayName: ["ink_primitives", "ConstructorResult"],
              type: 8,
            },
            selector: "0x9bae9d5e",
          },
        ],
        docs: [],
        environment: {
          accountId: {
            displayName: ["AccountId"],
            type: 0,
          },
          balance: {
            displayName: ["Balance"],
            type: 7,
          },
          blockNumber: {
            displayName: ["BlockNumber"],
            type: 4,
          },
          chainExtension: {
            displayName: ["ChainExtension"],
            type: 45,
          },
          hash: {
            displayName: ["Hash"],
            type: 38,
          },
          maxEventTopics: 4,
          timestamp: {
            displayName: ["Timestamp"],
            type: 6,
          },
        },
        events: [
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "fee",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "SalePoolBuyEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "pool_type",
                type: {
                  displayName: ["PoolType"],
                  type: 20,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "price",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "AddWhitelistEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "pool_type",
                type: {
                  displayName: ["PoolType"],
                  type: 20,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "price",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "UpdateWhitelistEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "pool_type",
                type: {
                  displayName: ["PoolType"],
                  type: 20,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
            ],
            docs: [],
            label: "RemoveWhitelistEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "pool_type",
                type: {
                  displayName: ["PoolType"],
                  type: 20,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buyer",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "buy_amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "purchased_amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "WhitelistBuyEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "contract_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "MintTokenEvent",
          },
          {
            args: [
              {
                docs: [],
                indexed: false,
                label: "contract_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                docs: [],
                indexed: false,
                label: "amount",
                type: {
                  displayName: ["Balance"],
                  type: 7,
                },
              },
            ],
            docs: [],
            label: "BurnTokenEvent",
          },
        ],
        lang_error: {
          displayName: ["ink", "LangError"],
          type: 9,
        },
        messages: [
          {
            args: [
              {
                label: "admin_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                label: "betaz_token_address",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [" Function init"],
            label: "initialize",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xf2f6dba3",
          },
          {
            args: [
              {
                label: "psp22_contract_address",
                type: {
                  displayName: ["admintrait_external", "TranferPsp22Input1"],
                  type: 0,
                },
              },
              {
                label: "amount",
                type: {
                  displayName: ["admintrait_external", "TranferPsp22Input2"],
                  type: 7,
                },
              },
              {
                label: "receiver",
                type: {
                  displayName: ["admintrait_external", "TranferPsp22Input3"],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [
              " This function allow contract owner withdraw PSP22 to an account in case there is any token sent to contract by mistake",
            ],
            label: "AdminTrait::tranfer_psp22",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xd9aad284",
          },
          {
            args: [
              {
                label: "value",
                type: {
                  displayName: ["admintrait_external", "WithdrawFeeInput1"],
                  type: 7,
                },
              },
              {
                label: "receiver",
                type: {
                  displayName: ["admintrait_external", "WithdrawFeeInput2"],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [
              " This function allows contract owner to withdraw contract balance to his account.",
            ],
            label: "AdminTrait::withdraw_fee",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0x07573e99",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddMultiWhitelistsInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "accounts",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddMultiWhitelistsInput2",
                  ],
                  type: 21,
                },
              },
              {
                label: "amounts",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddMultiWhitelistsInput3",
                  ],
                  type: 22,
                },
              },
              {
                label: "prices",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddMultiWhitelistsInput4",
                  ],
                  type: 22,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::add_multi_whitelists",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xa78d8747",
          },
          {
            args: [
              {
                label: "betaz_token_address",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "SetBetazTokenAddressInput1",
                  ],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::set_betaz_token_address",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xd4d39707",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: ["salepooltrait_external", "AddWhitelistInput1"],
                  type: 20,
                },
              },
              {
                label: "account",
                type: {
                  displayName: ["salepooltrait_external", "AddWhitelistInput2"],
                  type: 0,
                },
              },
              {
                label: "amount",
                type: {
                  displayName: ["salepooltrait_external", "AddWhitelistInput3"],
                  type: 7,
                },
              },
              {
                label: "price",
                type: {
                  displayName: ["salepooltrait_external", "AddWhitelistInput4"],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::add_whitelist",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xec2a4567",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetPoolSaleTotalRemainingAmountInput1",
                  ],
                  type: 20,
                },
              },
            ],
            default: false,
            docs: [" Get pool sale info total remaining amount"],
            label: "SalePoolTrait::get_pool_sale_total_remaining_amount",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 23,
            },
            selector: "0x84bb77f5",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: ["salepooltrait_external", "WhitelistBuyInput1"],
                  type: 20,
                },
              },
              {
                label: "amount",
                type: {
                  displayName: ["salepooltrait_external", "WhitelistBuyInput2"],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::whitelist_buy",
            mutates: true,
            payable: true,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0x86301e41",
          },
          {
            args: [],
            default: false,
            docs: [" Get bet az token contract"],
            label: "SalePoolTrait::get_betaz_token_address",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 25,
            },
            selector: "0xd7a42be6",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateMultiWhitelistsInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "accounts",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateMultiWhitelistsInput2",
                  ],
                  type: 21,
                },
              },
              {
                label: "amounts",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateMultiWhitelistsInput3",
                  ],
                  type: 22,
                },
              },
              {
                label: "prices",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateMultiWhitelistsInput4",
                  ],
                  type: 22,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::update_multi_whitelists",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0x455f94b0",
          },
          {
            args: [
              {
                label: "amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "BuyWithSalePoolInput1",
                  ],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::buy_with_sale_pool",
            mutates: true,
            payable: true,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0x28aede93",
          },
          {
            args: [],
            default: false,
            docs: [" Function changes state"],
            label: "SalePoolTrait::change_state",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xf778b5ed",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "buy_status",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput2",
                  ],
                  type: 3,
                },
              },
              {
                label: "end_time_buy",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput3",
                  ],
                  type: 6,
                },
              },
              {
                label: "total_amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput4",
                  ],
                  type: 7,
                },
              },
              {
                label: "total_purchased_amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput5",
                  ],
                  type: 7,
                },
              },
              {
                label: "price",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "AddPoolByPoolTypeInput6",
                  ],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [],
            label: "SalePoolTrait::add_pool_by_pool_type",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xdaf5bf6c",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetPoolSaleInfoInput1",
                  ],
                  type: 20,
                },
              },
            ],
            default: false,
            docs: [" Get pool sale info"],
            label: "SalePoolTrait::get_pool_sale_info",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 26,
            },
            selector: "0xc3564970",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetTotalAccountByPoolTypeInput1",
                  ],
                  type: 20,
                },
              },
            ],
            default: false,
            docs: [" Get total account in pool type"],
            label: "SalePoolTrait::get_total_account_by_pool_type",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 29,
            },
            selector: "0x2a278862",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetWhitelistInfoInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "account",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetWhitelistInfoInput2",
                  ],
                  type: 0,
                },
              },
            ],
            default: false,
            docs: [" Get whitelist Info"],
            label: "SalePoolTrait::get_whitelist_info",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 30,
            },
            selector: "0xa8e356b8",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "buy_status",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput2",
                  ],
                  type: 3,
                },
              },
              {
                label: "end_time_buy",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput3",
                  ],
                  type: 6,
                },
              },
              {
                label: "total_amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput4",
                  ],
                  type: 7,
                },
              },
              {
                label: "total_purchased_amount",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput5",
                  ],
                  type: 7,
                },
              },
              {
                label: "price",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "UpdateSalePoolInfoPoolTypeInput6",
                  ],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [" update pool info"],
            label: "SalePoolTrait::update_sale_pool_info_pool_type",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 10,
            },
            selector: "0xca5443a1",
          },
          {
            args: [
              {
                label: "pool_type",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetAccountByPoolTypeInput1",
                  ],
                  type: 20,
                },
              },
              {
                label: "index",
                type: {
                  displayName: [
                    "salepooltrait_external",
                    "GetAccountByPoolTypeInput2",
                  ],
                  type: 7,
                },
              },
            ],
            default: false,
            docs: [" Get account in pool type"],
            label: "SalePoolTrait::get_account_by_pool_type",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 33,
            },
            selector: "0x924067e7",
          },
          {
            args: [],
            default: false,
            docs: [],
            label: "Ownable::renounce_ownership",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 35,
            },
            selector: "0x5e228753",
          },
          {
            args: [
              {
                label: "new_owner",
                type: {
                  displayName: ["ownable_external", "TransferOwnershipInput1"],
                  type: 34,
                },
              },
            ],
            default: false,
            docs: [],
            label: "Ownable::transfer_ownership",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 35,
            },
            selector: "0x11f43efd",
          },
          {
            args: [],
            default: false,
            docs: [],
            label: "Ownable::owner",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 33,
            },
            selector: "0x4fa43c8c",
          },
          {
            args: [],
            default: false,
            docs: [],
            label: "Pausable::paused",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 37,
            },
            selector: "0xd123ce11",
          },
          {
            args: [
              {
                label: "new_code_hash",
                type: {
                  displayName: ["upgradeable_external", "SetCodeHashInput1"],
                  type: 38,
                },
              },
            ],
            default: false,
            docs: [],
            label: "Upgradeable::set_code_hash",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 39,
            },
            selector: "0x1700ae80",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "GetRoleAdminInput1"],
                  type: 4,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::get_role_admin",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 42,
            },
            selector: "0x83da3bb2",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "GrantRoleInput1"],
                  type: 4,
                },
              },
              {
                label: "account",
                type: {
                  displayName: ["accesscontrol_external", "GrantRoleInput2"],
                  type: 34,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::grant_role",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 43,
            },
            selector: "0x4ac062fd",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "RevokeRoleInput1"],
                  type: 4,
                },
              },
              {
                label: "account",
                type: {
                  displayName: ["accesscontrol_external", "RevokeRoleInput2"],
                  type: 34,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::revoke_role",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 43,
            },
            selector: "0x6e4f0991",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "HasRoleInput1"],
                  type: 4,
                },
              },
              {
                label: "address",
                type: {
                  displayName: ["accesscontrol_external", "HasRoleInput2"],
                  type: 34,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::has_role",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 37,
            },
            selector: "0xc1d9ac18",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: ["accesscontrol_external", "RenounceRoleInput1"],
                  type: 4,
                },
              },
              {
                label: "account",
                type: {
                  displayName: ["accesscontrol_external", "RenounceRoleInput2"],
                  type: 34,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControl::renounce_role",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 43,
            },
            selector: "0xeaf1248a",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: [
                    "accesscontrolenumerable_external",
                    "GetRoleMemberInput1",
                  ],
                  type: 4,
                },
              },
              {
                label: "index",
                type: {
                  displayName: [
                    "accesscontrolenumerable_external",
                    "GetRoleMemberInput2",
                  ],
                  type: 4,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControlEnumerable::get_role_member",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 33,
            },
            selector: "0x163469e0",
          },
          {
            args: [
              {
                label: "role",
                type: {
                  displayName: [
                    "accesscontrolenumerable_external",
                    "GetRoleMemberCountInput1",
                  ],
                  type: 4,
                },
              },
            ],
            default: false,
            docs: [],
            label: "AccessControlEnumerable::get_role_member_count",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ink", "MessageResult"],
              type: 42,
            },
            selector: "0xf1b1a9d7",
          },
        ],
      },
      storage: {
        root: {
          layout: {
            struct: {
              fields: [
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            root: {
                              layout: {
                                enum: {
                                  dispatchKey: "0x6f713913",
                                  name: "Option",
                                  variants: {
                                    0: {
                                      fields: [],
                                      name: "None",
                                    },
                                    1: {
                                      fields: [
                                        {
                                          layout: {
                                            leaf: {
                                              key: "0x6f713913",
                                              ty: 0,
                                            },
                                          },
                                          name: "0",
                                        },
                                      ],
                                      name: "Some",
                                    },
                                  },
                                },
                              },
                              root_key: "0x6f713913",
                            },
                          },
                          name: "owner",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "ownable",
                },
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0xec3485f7",
                                  ty: 3,
                                },
                              },
                              root_key: "0xec3485f7",
                            },
                          },
                          name: "paused",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "pausable",
                },
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0x1f2cf4ac",
                                  ty: 4,
                                },
                              },
                              root_key: "0x1f2cf4ac",
                            },
                          },
                          name: "admin_roles",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0x8150f558",
                                  ty: 5,
                                },
                              },
                              root_key: "0x8150f558",
                            },
                          },
                          name: "members",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "access",
                },
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0x1eb9f2a8",
                                  ty: 4,
                                },
                              },
                              root_key: "0x1eb9f2a8",
                            },
                          },
                          name: "admin_roles",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                enum: {
                                  dispatchKey: "0x869d6fc0",
                                  name: "Option",
                                  variants: {
                                    0: {
                                      fields: [],
                                      name: "None",
                                    },
                                    1: {
                                      fields: [
                                        {
                                          layout: {
                                            leaf: {
                                              key: "0x869d6fc0",
                                              ty: 0,
                                            },
                                          },
                                          name: "0",
                                        },
                                      ],
                                      name: "Some",
                                    },
                                  },
                                },
                              },
                              root_key: "0x869d6fc0",
                            },
                          },
                          name: "role_members",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "enumerable",
                },
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: "0x00000000",
                              ty: 0,
                            },
                          },
                          name: "admin_address",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x00000000",
                              ty: 0,
                            },
                          },
                          name: "betaz_token_address",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                struct: {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 3,
                                        },
                                      },
                                      name: "buy_status",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 6,
                                        },
                                      },
                                      name: "end_time_buy",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 7,
                                        },
                                      },
                                      name: "total_amount",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 7,
                                        },
                                      },
                                      name: "total_purchased_amount",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x3b8bc786",
                                          ty: 7,
                                        },
                                      },
                                      name: "price",
                                    },
                                  ],
                                  name: "PoolSaleInfo",
                                },
                              },
                              root_key: "0x3b8bc786",
                            },
                          },
                          name: "pool_sale_info",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                leaf: {
                                  key: "0x9c3ce6c7",
                                  ty: 0,
                                },
                              },
                              root_key: "0x9c3ce6c7",
                            },
                          },
                          name: "whitelist_account",
                        },
                        {
                          layout: {
                            root: {
                              layout: {
                                struct: {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0xeec0ef40",
                                          ty: 7,
                                        },
                                      },
                                      name: "amount",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0xeec0ef40",
                                          ty: 7,
                                        },
                                      },
                                      name: "price",
                                    },
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0xeec0ef40",
                                          ty: 7,
                                        },
                                      },
                                      name: "purchased_amount",
                                    },
                                  ],
                                  name: "WhitelistInfo",
                                },
                              },
                              root_key: "0xeec0ef40",
                            },
                          },
                          name: "whitelist",
                        },
                        {
                          layout: {
                            enum: {
                              dispatchKey: "0x00000000",
                              name: "Option",
                              variants: {
                                0: {
                                  fields: [],
                                  name: "None",
                                },
                                1: {
                                  fields: [
                                    {
                                      layout: {
                                        leaf: {
                                          key: "0x00000000",
                                          ty: 5,
                                        },
                                      },
                                      name: "0",
                                    },
                                  ],
                                  name: "Some",
                                },
                              },
                            },
                          },
                          name: "_reserved",
                        },
                      ],
                      name: "Data",
                    },
                  },
                  name: "data",
                },
              ],
              name: "SalePoolContract",
            },
          },
          root_key: "0x00000000",
        },
      },
      types: [
        {
          id: 0,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    type: 1,
                    typeName: "[u8; 32]",
                  },
                ],
              },
            },
            path: ["ink_primitives", "types", "AccountId"],
          },
        },
        {
          id: 1,
          type: {
            def: {
              array: {
                len: 32,
                type: 2,
              },
            },
          },
        },
        {
          id: 2,
          type: {
            def: {
              primitive: "u8",
            },
          },
        },
        {
          id: 3,
          type: {
            def: {
              primitive: "bool",
            },
          },
        },
        {
          id: 4,
          type: {
            def: {
              primitive: "u32",
            },
          },
        },
        {
          id: 5,
          type: {
            def: {
              tuple: [],
            },
          },
        },
        {
          id: 6,
          type: {
            def: {
              primitive: "u64",
            },
          },
        },
        {
          id: 7,
          type: {
            def: {
              primitive: "u128",
            },
          },
        },
        {
          id: 8,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 9,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 1,
                    name: "CouldNotReadInput",
                  },
                ],
              },
            },
            path: ["ink_primitives", "LangError"],
          },
        },
        {
          id: 10,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 11,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 11,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 11,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 12,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 12,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 12,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 0,
                    name: "Custom",
                  },
                  {
                    index: 1,
                    name: "OnlyOwner",
                  },
                  {
                    index: 2,
                    name: "OnlyAdmin",
                  },
                  {
                    index: 3,
                    name: "InvalidCaller",
                  },
                  {
                    index: 4,
                    name: "OnlyMinterCanMint",
                  },
                  {
                    index: 5,
                    name: "NotApproved",
                  },
                  {
                    index: 6,
                    name: "CannotTransfer",
                  },
                  {
                    index: 7,
                    name: "CannotMint",
                  },
                  {
                    index: 8,
                    name: "InvalidBuyTokensStatus",
                  },
                  {
                    index: 9,
                    name: "InvalidRewardTokensStatus",
                  },
                  {
                    index: 10,
                    name: "InsufficientAllowanceToLend",
                  },
                  {
                    index: 11,
                    name: "NotEnoughBalance",
                  },
                  {
                    index: 12,
                    name: "WithdrawFeeError",
                  },
                  {
                    index: 13,
                    name: "MaxBuyTokenAmount",
                  },
                  {
                    index: 14,
                    name: "TokensCanNotPurchased",
                  },
                  {
                    index: 15,
                    name: "TransferFailed",
                  },
                  {
                    index: 16,
                    name: "AlreadyInit",
                  },
                  {
                    index: 17,
                    name: "NotOwner",
                  },
                  {
                    index: 18,
                    name: "BetNotFinalized",
                  },
                  {
                    index: 19,
                    name: "CallerIsNotAdmin",
                  },
                  {
                    index: 20,
                    name: "InvalidInput",
                  },
                  {
                    index: 21,
                    name: "BetNotExist",
                  },
                  {
                    index: 22,
                    name: "HoldAmountPlayerNotExist",
                  },
                  {
                    index: 23,
                    name: "NoAmount",
                  },
                  {
                    index: 24,
                    name: "InvalidBalanceAndAllowance",
                  },
                  {
                    index: 25,
                    name: "InvalidUnstakedAmount",
                  },
                  {
                    index: 26,
                    name: "NotTimeToUnstaked",
                  },
                  {
                    index: 27,
                    name: "NoStakerFound",
                  },
                  {
                    index: 28,
                    name: "NotStaked",
                  },
                  {
                    index: 29,
                    name: "InvalidTotalStake",
                  },
                  {
                    index: 30,
                    name: "CallerNotRequestUnstake",
                  },
                  {
                    index: 31,
                    name: "ClaimMustBeFalse",
                  },
                  {
                    index: 32,
                    name: "RewardStarted",
                  },
                  {
                    index: 33,
                    name: "RewardNotStarted",
                  },
                  {
                    index: 34,
                    name: "InvalidInputRatio",
                  },
                  {
                    index: 35,
                    name: "NotTimeBuyToken",
                  },
                  {
                    index: 36,
                    name: "CannotBuyAtThisTime",
                  },
                  {
                    index: 37,
                    name: "NotTimeToFinalize",
                  },
                  {
                    index: 38,
                    name: "WhitelistNotExists",
                  },
                  {
                    index: 39,
                    name: "PoolNotExists",
                  },
                  {
                    index: 40,
                    name: "InvalidWhitelistData",
                  },
                  {
                    index: 41,
                    name: "WhitelistInfoExist",
                  },
                  {
                    index: 42,
                    name: "WhitelistBuyerPurchased",
                  },
                  {
                    index: 43,
                    name: "SalePoolPrurchased",
                  },
                  {
                    index: 44,
                    name: "PoolPrurchased",
                  },
                  {
                    index: 45,
                    name: "InvalidEndTime",
                  },
                  {
                    index: 46,
                    name: "NotTokenOwner",
                  },
                  {
                    index: 47,
                    name: "CannotIncreaseLastTokenId",
                  },
                  {
                    index: 48,
                    name: "CannotSetAttributes",
                  },
                  {
                    index: 49,
                    name: "SessionNotExists",
                  },
                  {
                    index: 50,
                    name: "SessionIsExists",
                  },
                  {
                    index: 51,
                    name: "BetIsExists",
                  },
                  {
                    index: 52,
                    name: "SessionNotCompleted",
                  },
                  {
                    index: 53,
                    name: "SessionNotFinished",
                  },
                  {
                    index: 54,
                    name: "SessionNotProcessed",
                  },
                  {
                    index: 55,
                    name: "YouAreNotWinner",
                  },
                  {
                    index: 56,
                    name: "InvalidState",
                  },
                  {
                    index: 57,
                    name: "SessionNotTicketWin",
                  },
                  {
                    index: 58,
                    name: "NftIsUsed",
                  },
                  {
                    index: 59,
                    name: "NftIsNotUsed",
                  },
                  {
                    index: 60,
                    name: "CannotBurn",
                  },
                  {
                    index: 61,
                    name: "NextSessionsNotExists",
                  },
                  {
                    index: 62,
                    name: "AddSessionFailed",
                  },
                  {
                    index: 63,
                    name: "InvalidFee",
                  },
                  {
                    index: 64,
                    name: "PoolIsExists",
                  },
                  {
                    index: 65,
                    name: "InvalidTotalPurchasedAmount",
                  },
                  {
                    index: 66,
                    name: "TicketAmountLimitReached",
                  },
                  {
                    index: 67,
                    name: "NotTimeToFinalized",
                  },
                  {
                    index: 68,
                    name: "CallerDoNotHaveVoting",
                  },
                  {
                    index: 69,
                    name: "SetPoolRationFailed",
                  },
                  {
                    index: 70,
                    name: "FailToDecreaseClaimableReward",
                  },
                  {
                    index: 71,
                    name: "RewardNotAdded",
                  },
                  {
                    index: 72,
                    name: "ChainlinkRequestIdIsExists",
                  },
                  {
                    index: 73,
                    name: "CannotUpdateSession",
                  },
                  {
                    fields: [
                      {
                        type: 14,
                        typeName: "OwnableError",
                      },
                    ],
                    index: 74,
                    name: "OwnableError",
                  },
                  {
                    fields: [
                      {
                        type: 15,
                        typeName: "AccessControlError",
                      },
                    ],
                    index: 75,
                    name: "AccessControlError",
                  },
                  {
                    fields: [
                      {
                        type: 16,
                        typeName: "PSP22Error",
                      },
                    ],
                    index: 76,
                    name: "PSP22Error",
                  },
                  {
                    fields: [
                      {
                        type: 18,
                        typeName: "PSP34Error",
                      },
                    ],
                    index: 77,
                    name: "PSP34Error",
                  },
                  {
                    fields: [
                      {
                        type: 19,
                        typeName: "PausableError",
                      },
                    ],
                    index: 78,
                    name: "PausableError",
                  },
                  {
                    index: 79,
                    name: "CheckedOperations",
                  },
                  {
                    index: 80,
                    name: "CannotRandomAmounts",
                  },
                ],
              },
            },
            path: ["bet_a0", "traits", "error", "Error"],
          },
        },
        {
          id: 13,
          type: {
            def: {
              primitive: "str",
            },
          },
        },
        {
          id: 14,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "CallerIsNotOwner",
                  },
                  {
                    index: 1,
                    name: "NewOwnerIsNotSet",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "ownable",
              "OwnableError",
            ],
          },
        },
        {
          id: 15,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "InvalidCaller",
                  },
                  {
                    index: 1,
                    name: "MissingRole",
                  },
                  {
                    index: 2,
                    name: "RoleRedundant",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "access_control",
              "AccessControlError",
            ],
          },
        },
        {
          id: 16,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 0,
                    name: "Custom",
                  },
                  {
                    index: 1,
                    name: "InsufficientBalance",
                  },
                  {
                    index: 2,
                    name: "InsufficientAllowance",
                  },
                  {
                    index: 3,
                    name: "RecipientIsNotSet",
                  },
                  {
                    index: 4,
                    name: "SenderIsNotSet",
                  },
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 5,
                    name: "SafeTransferCheckFailed",
                  },
                  {
                    index: 6,
                    name: "PermitInvalidSignature",
                  },
                  {
                    index: 7,
                    name: "PermitExpired",
                  },
                  {
                    fields: [
                      {
                        type: 17,
                        typeName: "NoncesError",
                      },
                    ],
                    index: 8,
                    name: "NoncesError",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "psp22",
              "PSP22Error",
            ],
          },
        },
        {
          id: 17,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 0,
                        typeName: "AccountId",
                      },
                      {
                        type: 6,
                        typeName: "u64",
                      },
                    ],
                    index: 0,
                    name: "InvalidAccountNonce",
                  },
                  {
                    index: 1,
                    name: "NonceOverflow",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "nonces",
              "NoncesError",
            ],
          },
        },
        {
          id: 18,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 0,
                    name: "Custom",
                  },
                  {
                    index: 1,
                    name: "SelfApprove",
                  },
                  {
                    index: 2,
                    name: "NotApproved",
                  },
                  {
                    index: 3,
                    name: "TokenExists",
                  },
                  {
                    index: 4,
                    name: "TokenNotExists",
                  },
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 5,
                    name: "SafeTransferCheckFailed",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "psp34",
              "PSP34Error",
            ],
          },
        },
        {
          id: 19,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "Paused",
                  },
                  {
                    index: 1,
                    name: "NotPaused",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "pausable",
              "PausableError",
            ],
          },
        },
        {
          id: 20,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "Sale",
                  },
                  {
                    index: 1,
                    name: "PrivateInvestment",
                  },
                  {
                    index: 2,
                    name: "AirdropAndMarketing",
                  },
                  {
                    index: 3,
                    name: "Team",
                  },
                  {
                    index: 4,
                    name: "Development",
                  },
                ],
              },
            },
            path: ["bet_a0", "impls", "sale", "data", "PoolType"],
          },
        },
        {
          id: 21,
          type: {
            def: {
              sequence: {
                type: 0,
              },
            },
          },
        },
        {
          id: 22,
          type: {
            def: {
              sequence: {
                type: 7,
              },
            },
          },
        },
        {
          id: 23,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 24,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 24,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 24,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "None",
                  },
                  {
                    fields: [
                      {
                        type: 7,
                      },
                    ],
                    index: 1,
                    name: "Some",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 7,
              },
            ],
            path: ["Option"],
          },
        },
        {
          id: 25,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 0,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 0,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 26,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 27,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 27,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 27,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "None",
                  },
                  {
                    fields: [
                      {
                        type: 28,
                      },
                    ],
                    index: 1,
                    name: "Some",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 28,
              },
            ],
            path: ["Option"],
          },
        },
        {
          id: 28,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    name: "buy_status",
                    type: 3,
                    typeName: "bool",
                  },
                  {
                    name: "end_time_buy",
                    type: 6,
                    typeName: "Timestamp",
                  },
                  {
                    name: "total_amount",
                    type: 7,
                    typeName: "Balance",
                  },
                  {
                    name: "total_purchased_amount",
                    type: 7,
                    typeName: "Balance",
                  },
                  {
                    name: "price",
                    type: 7,
                    typeName: "Balance",
                  },
                ],
              },
            },
            path: ["bet_a0", "impls", "sale", "data", "PoolSaleInfo"],
          },
        },
        {
          id: 29,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 7,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 7,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 30,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 31,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 31,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 31,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "None",
                  },
                  {
                    fields: [
                      {
                        type: 32,
                      },
                    ],
                    index: 1,
                    name: "Some",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 32,
              },
            ],
            path: ["Option"],
          },
        },
        {
          id: 32,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    name: "amount",
                    type: 7,
                    typeName: "Balance",
                  },
                  {
                    name: "price",
                    type: 7,
                    typeName: "Balance",
                  },
                  {
                    name: "purchased_amount",
                    type: 7,
                    typeName: "Balance",
                  },
                ],
              },
            },
            path: ["bet_a0", "impls", "sale", "data", "WhitelistInfo"],
          },
        },
        {
          id: 33,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 34,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 34,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 34,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "None",
                  },
                  {
                    fields: [
                      {
                        type: 0,
                      },
                    ],
                    index: 1,
                    name: "Some",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 0,
              },
            ],
            path: ["Option"],
          },
        },
        {
          id: 35,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 36,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 36,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 36,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 14,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 14,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 37,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 3,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 3,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 38,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    type: 1,
                    typeName: "[u8; 32]",
                  },
                ],
              },
            },
            path: ["ink_primitives", "types", "Hash"],
          },
        },
        {
          id: 39,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 40,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 40,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 40,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 41,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 41,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 41,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 13,
                        typeName: "String",
                      },
                    ],
                    index: 0,
                    name: "Custom",
                  },
                  {
                    index: 1,
                    name: "SetCodeHashFailed",
                  },
                  {
                    fields: [
                      {
                        type: 14,
                        typeName: "OwnableError",
                      },
                    ],
                    index: 2,
                    name: "OwnableError",
                  },
                  {
                    fields: [
                      {
                        type: 15,
                        typeName: "AccessControlError",
                      },
                    ],
                    index: 3,
                    name: "AccessControlError",
                  },
                ],
              },
            },
            path: [
              "openbrush_contracts",
              "traits",
              "errors",
              "upgradeable",
              "UpgradeableError",
            ],
          },
        },
        {
          id: 42,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 4,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 4,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 43,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 44,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 9,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 44,
              },
              {
                name: "E",
                type: 9,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 44,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 5,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 15,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 5,
              },
              {
                name: "E",
                type: 15,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 45,
          type: {
            def: {
              variant: {},
            },
            path: ["ink_env", "types", "NoChainExtension"],
          },
        },
      ],
      version: "4",
    },
  },
};

const sale_pool_contract = contract[process.env.REACT_APP_ENV];
export default sale_pool_contract;
