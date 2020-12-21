export enum Api {
  PRICE_LEVEL_VIE_ADD = '/yi/user/PriceLevelVieAdd', // 平台闪断贴标准增加-----S
  PRICE_LEVEL_VIE_LIST = '/yi/user/PriceLevelVieList', // 平台闪断贴标准列表-----B+S
  PRICE_LEVEL_VIE_GET = '/yi/user/PriceLevelVieGet', // 平台闪断贴标准根据id获取------B+S
  PRICE_LEVEL_VIE_CH = '/yi/user/PriceLevelVieCh', // 平台闪断贴标准修改------S
  PRICE_LEVEL_VIE_RM = '/yi/user/PriceLevelVieRm', // 平台闪断贴标准根据id删除------S

  PRICE_LEVEL_PRIZE_ADD = '/yi/user/PriceLevelPrizeAdd', // 平台悬赏贴标准添加------S
  PRICE_LEVEL_PRIZE_LIST = '/yi/user/PriceLevelPrizeList', // 平台悬赏贴标准列表------B+S
  PRICE_LEVEL_PRIZE_GET = '/yi/user/PriceLevelPrizeGet', // 平台悬贴标准根据id获取------B+S
  PRICE_LEVEL_PRIZE_CH = '/yi/user/PriceLevelPrizeCh', // 平台悬赏贴标准修改------S
  PRICE_LEVEL_PRIZE_RM = '/yi/user/PriceLevelPrizeRm', // 平台悬赏贴标准根据id删除------S

  BROKER_PRICE_LEVEL_PRIZE_ADD = '/yi/user/BrokerPriceLevelPrizeAdd', // 运营商悬赏贴收费标准新增------B+S
  BROKER_PRICE_LEVEL_PRIZE_GET = '/yi/user/BrokerPriceLevelPrizeGet', // 运营商悬赏贴标准根据id获取------B+S
  BROKER_PRICE_LEVEL_PRIZE_LIST = '/yi/user/BrokerPriceLevelPrizeList', // 运营商悬赏贴收费标准列表------B+S
  BROKER_PRICE_LEVEL_PRIZE_USER_LIST = '/yi/user/BrokerPriceLevelPrizeUserList', // 运营商悬赏贴额收费标准列表------U
  BROKER_PRICE_LEVEL_PRIZE_CH = '/yi/user/BrokerPriceLevelPrizeCh', // 运营商悬赏贴标准修改----B+S
  BROKER_PRICE_LEVEL_PRIZE_SET_ENABLED = '/yi/user/BrokerPriceLevelPrizeSetEnabled', // 运营商悬赏贴标准根据id禁止或启用------B+S

  BROKER_PRICE_LEVEL_VIE_ADD = '/yi/user/BrokerPriceLevelVieAdd', // 运营商闪断贴收费标准新增------B+S
  BROKER_PRICE_LEVEL_VIE_GET = '/yi/user/BrokerPriceLevelVieGet', // 运营商闪断贴标准根据id获取------B+S
  BROKER_PRICE_LEVEL_VIE_LIST = '/yi/user/BrokerPriceLevelVieList', // 运营商闪断贴收费标准列表------B+S
  BROKER_PRICE_LEVEL_VIE_CH = '/yi/user/BrokerPriceLevelVieCh', // 运营商闪断贴标准修改------B+S
  BROKER_PRICE_LEVEL_VIE_SET_ENABLED = '/yi/user/BrokerPriceLevelVieSetEnabled', // 运营商闪断贴标准根据id禁止或启用------B+S
}

export interface PriceLevel {
  ID: string;
  created_at: string;
  price: number;
  sort_no: number;
  title: string;
  update_at: string;
  ver: number;
}
