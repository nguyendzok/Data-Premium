var WinkVip = JSON.parse($response.body);
const vip = '/user/vip_info';
const user = '/user/show';

if ($request.url.indexOf(vip) != -1){
WinkVip.data.trial_period_invalid_time = 4092599349000;
WinkVip.data.current_order_invalid_time = 4092599349000;
WinkVip.data.valid_time = 4092599349000;
WinkVip.data.invalid_time = 4092599349000;
WinkVip.data.use_vip = true;
WinkVip.data.have_valid_contract = true;
WinkVip.data.derive_type_name = "普通会员";
WinkVip.data.in_trial_period = true;
WinkVip.data.is_vip = true;
}

if ($request.url.indexOf(user) != -1){
WinkVip.data.vip_type = 1;
WinkVip.data.vip_icon = "https://xximg1.meitudata.com/6948531818264286440.png";
WinkVip.data.follower_count = 999000;
WinkVip.data.fan_count = 999000;
WinkVip.data.favorites_count = 999000;
WinkVip.data.be_like_count = 999000;
}

$done({body : JSON.stringify(WinkVip)});
