let ret = {};

(async () => {
    if ($response.status !== 200) {
        const allPolicy = await new Promise((r) => {
            $httpAPI("GET", "v1/policies", null, (v) => r(
                [...v.proxies, ...v['policy-groups']]
            ))
        });
        const selected = allPolicy.filter((n) => {
            return n && new RegExp(typeof $argument == 'string' ? $argument : "").test(n)
        });
        console.log(`[INFO]: Use policy ${JSON.stringify(selected, null, 2)}`);
        delete $request.headers.cookie;
        delete $request.headers.Cookie;
        const http = [
            new Promise((r, e) => setTimeout(() => e('Timeout'), 5000)),
            ...selected.map(
                (v) => new Promise((r, e) => {
                    $httpClient[$request.method.toLowerCase()]({
                        url: $request.url,
                        headers: $request.headers,
                        policy: v
                    }, (error, response, body) => {
                        if (response && response.status == 200) {
                            r({
                                policy: v,
                                body: {
                                    headers: response.headers,
                                    status: response.status,
                                    body: body
                                }
                            })
                        } else if (response && response.status == 429) {
                            console.log(`[ERROR]: Policy "${v}" need to CAPTCHA`);
                        } else if (error) {
                            console.log(`[ERROR]: Policy "${v}" ${error}`);
                        }
                    })
                })
            )
        ];
        await Promise.race(http).then((data) => {
            ret = data.body;
            console.log(`[INFO]: Use data from "${data.policy}"`);
        });
    }
})()
    .catch((err) => console.log(`[ERROR]: ${(err && err.message) || err}`))
    .finally(() => $done(ret));