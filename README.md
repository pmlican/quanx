# quanx脚本

### 星趣童堡

//星趣童堡
[task_local]
1 0 * * * https://raw.githubusercontent.com/pmlican/quanx/main/xqtb.js, tag=星趣童堡签到

[rewrite_local]
^https:\/\/pw\.gzych\.vip\/ykb_huiyuan\/api\/v1\/Member\/GetMemberStoredValue url script-request-header https://raw.githubusercontent.com/pmlican/quanx/main/xqtb.js

