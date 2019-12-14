$(function(){
  function buildHTML(message){
  if (message.image) {
    var html = `<div class="chat-main__message-list">
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
               </div>`
      } else {
    var html = `<div class="chat-main__message-list">
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
                </div>`
              }
    return html
   }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    console.log(url)
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
  });
  })
})