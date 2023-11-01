function websocketInit() {

    var token = window.localStorage.getItem(currentUserInfo.username+"_token")
    if(token != null && token != undefined){
        try {
            websocket = new WebSocket("wss://localhost:8089/webSocket/" + currentUserInfo.username+"?token="+token);
        } catch (e) {
            console.log(' 您的浏览器暂时不支持 webSocket ');
        }
        websocket.onclose = function (e) {
            websocket.close();
            console.log("WebSocket 关闭");
        }

        websocket.onopen = function (e) {
            //心跳检测重置
            console.log("WebSocket 已连接");
        }

        //连接发生错误的回调方法
        websocket.onerror = function (data,status,e) {
            reconnectCount ++
            websocket.close();
            console.log("WebSocket 连接发生错误");
            reconnect()
            if(reconnectCount == 10){
                reconnectCount = 0
                wensocketErrorToast()
            }
        }

        websocket.onmessage = async function (event) {
            var data = JSON.parse(event.data);
            console.log("onmessage:"+JSON.stringify(data))
            let {contentType, from, content, to, sdp,iceCandidate } = JSON.parse(event.data);
            if (data.contentType == "online") {//上线消息
                var allUserSet = addOnlineUserAndGet(data.content)
                if (allUserSet.size == 1) {
                    $("#users").append(`<div class="list-group-item d-flex justify-content-between   active"  onclick="clicktalk(this)" data-bs-toggle="list"  ><span>${data.content}</span><span>在线</span><i class="bi bi-7-circle"></i></div>`);
                } else {
                    $("#users").append(`<div class="list-group-item d-flex justify-content-between  "  onclick="clicktalk(this)" data-bs-toggle="list"  ><span>${data.content}</span><span>在线</span><i class="bi bi-7-circle"></i></div>`);
                }
                var touser = currentUserInfo.to
                if (touser == undefined || touser == null) {
                    talkuser(data.content)
                }
            } else if (data.contentType == "offline") {//下线消息
                $("#users > span").remove(":contains('" + data.content + "')");
            } else if (data.contentType == "text") {
                // 普通消息
                // 接收服务端的实时消息并添加到HTML页面中
                // $("#talk-container").append("<div class='bg-info'><label class='text-danger'>"+data.from+"&nbsp;"+data.date+"</label><div class='text-success'>"+data.text+"</div></div><br>");

                var messagevar = getEmojiStr(data.content)
                var message = `<div class="d-flex justify-content-start my-3">
                            <div class="card w-30 border-light">
                                <div class="card-header text-center chat-card-header">${data.from}&nbsp;${data.date}</div>
                                <div class="card-body text-center" style="background: #95ec69"> ${messagevar} </div>
                            </div>
                        </div>`;
                if (data.from == currentUserInfo.to) {
                    $("#talk-container").append(message);
                } else {
                    addAndFlushUnreadMessageCount(data.from)
                }
                storageTalkUserMessage(data.from, message)
                // 滚动条滚动到最低部
                scrollToBottom();
            } else if(data.contentType == "onlineUsers") {
                window.localStorage.setItem(currentUserInfo.username+"-allUserList", JSON.stringify(data.content));
                createUserList(data.content)
            }else {
                //视频通话
                if(PeerConnection == null || PeerConnection ==undefined){
                    initWebRTC()
                }

                //视频信令处理
                videoSignallingHandle(data.contentType,data);


            }
        };

    }else{
        noTokenToast("用户未登录，请先登录")

    }


    //websocket重连
    function reconnect() {
        if (lockReconnect) return;
        lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多，每2秒重连一次
        setTimeout(function () {
            console.log("WebSocket：Reconnecting!");
            websocketInit();
            lockReconnect = false;
        }, 2000);
    }


}