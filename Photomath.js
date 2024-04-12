var body = JSON.parse($response.body);

body.content.tier.level = "genius";
body.content.subscription = {
      "packageName": "com.microblink.PhotoMath",
      "productId": "com.microblink.PhotoMath.purchase.genius.one_year",
      "orderId": "30001950099118",
      "expiry": "2099-03-14T17:53:50.000Z",
      "started": "2024-03-07T18:53:50.000Z",
      "autoRenewing": true,
      "status": "active",
      "inGracePeriod": false,
      "isTrial": false
    };

$done({ body: JSON.stringify(body) });