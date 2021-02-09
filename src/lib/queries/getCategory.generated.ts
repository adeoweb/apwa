/* eslint-disable */
import * as Types from '../types/graphql-types.d';

export type CategoryListQueryVariables = Types.Exact<{
    id: Types.Scalars['String'];
    pageSize: Types.Scalars['Int'];
    currentPage: Types.Scalars['Int'];
    sort?: Types.Maybe<Types.ProductAttributeSortInput>;
    onServer: Types.Scalars['Boolean'];
}>;

export type CategoryListQuery = {
    categoryList?: Types.Maybe<
        Array<
            Types.Maybe<{
                id?: Types.Maybe<number>;
                description?: Types.Maybe<string>;
                name?: Types.Maybe<string>;
                product_count?: Types.Maybe<number>;
                meta_title?: Types.Maybe<string>;
                meta_keywords?: Types.Maybe<string>;
                meta_description?: Types.Maybe<string>;
                products?: Types.Maybe<{
                    total_count?: Types.Maybe<number>;
                    page_info?: Types.Maybe<{
                        total_pages?: Types.Maybe<number>;
                    }>;
                    items?: Types.Maybe<
                        Array<
                            Types.Maybe<
                                | {
                                      __typename: 'VirtualProduct';
                                      id?: Types.Maybe<number>;
                                      name?: Types.Maybe<string>;
                                      sku?: Types.Maybe<string>;
                                      url_key?: Types.Maybe<string>;
                                      url_suffix?: Types.Maybe<string>;
                                      description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      short_description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      media_gallery?: Types.Maybe<
                                          Array<
                                              Types.Maybe<
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                              >
                                          >
                                      >;
                                      price_range: {
                                          maximum_price?: Types.Maybe<{
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          }>;
                                          minimum_price: {
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          };
                                      };
                                      small_image?: Types.Maybe<{
                                          url?: Types.Maybe<string>;
                                          label?: Types.Maybe<string>;
                                      }>;
                                  }
                                | {
                                      __typename: 'SimpleProduct';
                                      id?: Types.Maybe<number>;
                                      name?: Types.Maybe<string>;
                                      sku?: Types.Maybe<string>;
                                      url_key?: Types.Maybe<string>;
                                      url_suffix?: Types.Maybe<string>;
                                      description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      short_description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      media_gallery?: Types.Maybe<
                                          Array<
                                              Types.Maybe<
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                              >
                                          >
                                      >;
                                      price_range: {
                                          maximum_price?: Types.Maybe<{
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          }>;
                                          minimum_price: {
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          };
                                      };
                                      small_image?: Types.Maybe<{
                                          url?: Types.Maybe<string>;
                                          label?: Types.Maybe<string>;
                                      }>;
                                  }
                                | {
                                      __typename: 'DownloadableProduct';
                                      id?: Types.Maybe<number>;
                                      name?: Types.Maybe<string>;
                                      sku?: Types.Maybe<string>;
                                      url_key?: Types.Maybe<string>;
                                      url_suffix?: Types.Maybe<string>;
                                      description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      short_description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      media_gallery?: Types.Maybe<
                                          Array<
                                              Types.Maybe<
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                              >
                                          >
                                      >;
                                      price_range: {
                                          maximum_price?: Types.Maybe<{
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          }>;
                                          minimum_price: {
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          };
                                      };
                                      small_image?: Types.Maybe<{
                                          url?: Types.Maybe<string>;
                                          label?: Types.Maybe<string>;
                                      }>;
                                  }
                                | {
                                      __typename: 'BundleProduct';
                                      id?: Types.Maybe<number>;
                                      name?: Types.Maybe<string>;
                                      sku?: Types.Maybe<string>;
                                      url_key?: Types.Maybe<string>;
                                      url_suffix?: Types.Maybe<string>;
                                      description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      short_description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      media_gallery?: Types.Maybe<
                                          Array<
                                              Types.Maybe<
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                              >
                                          >
                                      >;
                                      price_range: {
                                          maximum_price?: Types.Maybe<{
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          }>;
                                          minimum_price: {
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          };
                                      };
                                      small_image?: Types.Maybe<{
                                          url?: Types.Maybe<string>;
                                          label?: Types.Maybe<string>;
                                      }>;
                                  }
                                | {
                                      __typename: 'GroupedProduct';
                                      id?: Types.Maybe<number>;
                                      name?: Types.Maybe<string>;
                                      sku?: Types.Maybe<string>;
                                      url_key?: Types.Maybe<string>;
                                      url_suffix?: Types.Maybe<string>;
                                      description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      short_description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      media_gallery?: Types.Maybe<
                                          Array<
                                              Types.Maybe<
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                              >
                                          >
                                      >;
                                      price_range: {
                                          maximum_price?: Types.Maybe<{
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          }>;
                                          minimum_price: {
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          };
                                      };
                                      small_image?: Types.Maybe<{
                                          url?: Types.Maybe<string>;
                                          label?: Types.Maybe<string>;
                                      }>;
                                  }
                                | {
                                      __typename: 'ConfigurableProduct';
                                      id?: Types.Maybe<number>;
                                      name?: Types.Maybe<string>;
                                      sku?: Types.Maybe<string>;
                                      url_key?: Types.Maybe<string>;
                                      url_suffix?: Types.Maybe<string>;
                                      configurable_options?: Types.Maybe<
                                          Array<
                                              Types.Maybe<{
                                                  attribute_code?: Types.Maybe<
                                                      string
                                                  >;
                                                  attribute_id?: Types.Maybe<
                                                      string
                                                  >;
                                                  id?: Types.Maybe<number>;
                                                  label?: Types.Maybe<string>;
                                                  values?: Types.Maybe<
                                                      Array<
                                                          Types.Maybe<{
                                                              default_label?: Types.Maybe<
                                                                  string
                                                              >;
                                                              label?: Types.Maybe<
                                                                  string
                                                              >;
                                                              store_label?: Types.Maybe<
                                                                  string
                                                              >;
                                                              use_default_value?: Types.Maybe<
                                                                  boolean
                                                              >;
                                                              value_index?: Types.Maybe<
                                                                  number
                                                              >;
                                                          }>
                                                      >
                                                  >;
                                              }>
                                          >
                                      >;
                                      variants?: Types.Maybe<
                                          Array<
                                              Types.Maybe<{
                                                  attributes?: Types.Maybe<
                                                      Array<
                                                          Types.Maybe<{
                                                              code?: Types.Maybe<
                                                                  string
                                                              >;
                                                              value_index?: Types.Maybe<
                                                                  number
                                                              >;
                                                          }>
                                                      >
                                                  >;
                                                  product?: Types.Maybe<{
                                                      id?: Types.Maybe<number>;
                                                      sku?: Types.Maybe<string>;
                                                      stock_status?: Types.Maybe<
                                                          Types.ProductStockStatus
                                                      >;
                                                      media_gallery?: Types.Maybe<
                                                          Array<
                                                              Types.Maybe<
                                                                  | {
                                                                        url?: Types.Maybe<
                                                                            string
                                                                        >;
                                                                        label?: Types.Maybe<
                                                                            string
                                                                        >;
                                                                    }
                                                                  | {
                                                                        url?: Types.Maybe<
                                                                            string
                                                                        >;
                                                                        label?: Types.Maybe<
                                                                            string
                                                                        >;
                                                                    }
                                                              >
                                                          >
                                                      >;
                                                  }>;
                                              }>
                                          >
                                      >;
                                      description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      short_description?: Types.Maybe<{
                                          html: string;
                                      }>;
                                      media_gallery?: Types.Maybe<
                                          Array<
                                              Types.Maybe<
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                                  | {
                                                        label?: Types.Maybe<
                                                            string
                                                        >;
                                                        url?: Types.Maybe<
                                                            string
                                                        >;
                                                    }
                                              >
                                          >
                                      >;
                                      price_range: {
                                          maximum_price?: Types.Maybe<{
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          }>;
                                          minimum_price: {
                                              discount?: Types.Maybe<{
                                                  amount_off?: Types.Maybe<
                                                      number
                                                  >;
                                                  percent_off?: Types.Maybe<
                                                      number
                                                  >;
                                              }>;
                                              final_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                              regular_price: {
                                                  currency?: Types.Maybe<
                                                      Types.CurrencyEnum
                                                  >;
                                                  value?: Types.Maybe<number>;
                                              };
                                          };
                                      };
                                      small_image?: Types.Maybe<{
                                          url?: Types.Maybe<string>;
                                          label?: Types.Maybe<string>;
                                      }>;
                                  }
                            >
                        >
                    >;
                }>;
            }>
        >
    >;
};