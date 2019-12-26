$(function(){

  function buildHTML(message){
  if (message.content && message.image) {
      var html = ` <div class="message" data-message-id="${message.id}">
                    <div class="chat-main__message">
                      <div class="user-name">
                      ${message.user_name}
                      </div>
                      <div class="date-time">
                      ${message.created_at}
                      </div>
                      <div class="comment"></div>
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      <img class="image-btn" src=${message.image} >
                      </div>
                    </div>`
      } else if(message.content) {
      var html = ` <div class="message" data-message-id="${message.id}">
                      <div class="chat-main__message">
                      <div class="user-name">
                      ${message.user_name}
                      </div>
                      <div class="date-time">
                      ${message.created_at}
                      </div>
                      <div class="comment"></div>
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      </div>
                    </div>`
      } else if (message.image){
      var html = ` <div class="message" data-message-id="${message.id}">
                      <div class="chat-main__message">
                      <div class="user-name">
                      ${message.user_name}
                      </div>
                      <div class="date-time">
                      ${message.created_at}
                      </div>
                      <img class="image-btn" src=${message.image} >
                      </div>
                  </div>`
              };
    return html
   }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url, 
      type: 'POST',  
      data: formData, 
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
       var html = buildHTML(message);
       $('.chat-main__message-list').append(html);
       $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
       $("form")[0].reset();
       $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.send-btn').prop('disabled', false);
  });
  })
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('message-id')
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
         //メッセージが入ったHTMLに、入れ物ごと追加
          $('.chat-main__message-list').append(insertHTML);
          $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      });
    })
    .fail(function() {
      alert('error')
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

