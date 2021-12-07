/*! messaging.js | Huro | Css Ninja. 2020-2021 */
"use strict";$(document).ready((function(){if($("#hide-chat-side").on("click",(function(){$(".chat-body-wrap, .message-field-wrapper").addClass("side-collapsed"),$(".chat-side-fab").addClass("is-active").removeClass("is-mobile-active"),$(".chat-side").removeClass("is-mobile-active")})),$(".chat-side-fab").on("click",(function(){$(this).removeClass("is-active").addClass("is-mobile-active"),$(".chat-body-wrap, .message-field-wrapper").removeClass("side-collapsed"),$(".chat-side").addClass("is-mobile-active")})),$("#messages-sidebar li, .collapsed-messaging li, #mobile-conversations-list li").on("click",(function(){$(".chat-header .is-autocomplete").addClass("is-hidden");$(this);var a=$(this).attr("data-conversation-menu"),s=$(this).find(".is-user").attr("src"),e=($(this).find(".is-badge").attr("src"),$(this).find(".recipient-meta span:first-child").html()||$(this).attr("data-username")),n=$(this).attr("data-position");$("#messages-sidebar li, .collapsed-messaging li, #mobile-conversations-list li").removeClass("is-active"),$('li[data-conversation-menu="'+a+'"]').addClass("is-active"),$(".is-chat").hasClass("is-hidden")&&$(".is-chat, .is-chat-placeholder").toggleClass("is-hidden"),$(".chat-loader").addClass("is-active"),$("#chat-body li:not(.no-messages):not(.chat-loader)").remove(),setTimeout((function(){$.ajax({url:"assets/data/"+a+".json",dataType:"json",success:function(i){var t="",l=feather.icons.link.toSvg(),c=feather.icons.maximize.toSvg(),d=feather.icons["download-cloud"].toSvg();for(var o in i.messages){var r=i.messages[o];for(var v in r){"msg"==r[v].type?t='\n                                    <li class="'+r[v].sender+'">\n                                        <div class="avatar">\n                                            <img src="'+r[v].avatar+'" draggable="false"/>\n                                        </div>\n                                        <div class="msg">\n                                        <div class="msg-inner">\n                                            <p>'+r[v].content.text+"</p>\n                                        </div>\n                                        <time>\n                                            "+r[v].content.time+"\n                                        </time>\n                                    </div>\n                                    </li>\n                                ":"system"==r[v].type?t='\n                                    <li class="divider-container">\n                                        <div class="divider">\n                                            <span>'+r[v].content.text+"</span>\n                                        </div>\n                                    </li>\n                                ":"imagelink"==r[v].type?t='\n                                    <li class="'+r[v].sender+'">\n                                        <div class="avatar">\n                                            <img src="'+r[v].avatar+'" draggable="false"/>\n                                        </div>\n                                        <div class="msg is-link-image">\n                                            <figure class="image">\n                                                <img src="'+r[v].content.link_image+'">\n                                                <div class="link-badge">\n                                                    <img src="'+r[v].content.link_badge+'">\n                                                </div>\n                                            </figure>\n                                            <div class="link-body">\n                                                <span class="link-title">'+r[v].content.text+"</span>\n                                                <small>"+r[v].content.subtext+"</small>\n                                            </div>\n                                        </div>\n                                    </li>\n                                ":"image"==r[v].type?t='\n                                    <li class="'+r[v].sender+'">\n                                        <div class="avatar is-online">\n                                            <img src="'+r[v].avatar+'" draggable="false"/>\n                                        </div>\n                                        <div class="msg is-image">\n                                            <div class="image-container">\n                                                <img src="'+r[v].content.image_url+'">\n                                                <div class="image-overlay"></div>\n                                                <div class="image-actions">\n                                                    <div class="actions-inner">\n                                                        <div class="action">\n                                                            '+d+'\n                                                        </div>\n                                                        <a href="'+r[v].content.image_url+'" class="action messaging-popup">\n                                                            '+c+"\n                                                        </a>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </li>\n                                ":"link"==r[v].type&&(t='\n                                    <li class="'+r[v].sender+'">\n                                        <div class="avatar is-online">\n                                            <img src="'+r[v].avatar+'" draggable="false"/>\n                                        </div>\n                                        <div class="msg is-link">\n                                            <div class="icon-wrapper">\n                                                '+l+'\n                                            </div>\n                                            <p class="link-meta">\n                                                <span>'+r[v].content.text+'</span>\n                                                <a href="#">'+r[v].content.subtext+"</a>\n                                            </p>\n                                        </div>\n                                    </li>\n                                "),$("#chat-body").append(t),$("#user-details-image").attr("src",s),$("#user-details-name").html(e),$("#user-details-title").html(n);var m=$(".chat-body");m.scrollTop(m.prop("scrollHeight")),0==$(".chat-body li").length?$(".no-messages").removeClass("is-hidden"):$(".no-messages").addClass("is-hidden"),$("#chat-body").attr("data-conversation-body",a),setTimeout((function(){$(".chat-loader").removeClass("is-active")}),500)}}}})}),1e3)})),$("#users-autocpl").length){var a={url:"assets/data/user.json",getValue:"name",template:{type:"custom",method:function(a,s){return"<div class=template-wrapper><div class=avatar-wrapper><img class=autocpl-avatar src='"+s.pic+"' /><img class=avatar-badge src='"+s.badge+"' /></div><div class=entry-text>"+a+"<br><span>"+s.location+"</span></div></div> "}},highlightPhrase:!1,list:{maxNumberOfElements:5,showAnimation:{type:"fade",time:400,callback:function(){}},match:{enabled:!0},onChooseEvent:function(){var a=$("#users-autocpl").val();$("#users-autocpl").val(""),console.log(a),$(".is-chat").hasClass("is-hidden")&&$(".is-chat, .is-chat-placeholder").toggleClass("is-hidden"),$("#chat-body li:not(.no-messages):not(.chat-loader)").remove(),$(".chat-header .is-autocomplete").addClass("is-hidden")}}};$("#users-autocpl").easyAutocomplete(a)}$("#users-autocpl").on("change",(function(){$(".start-conversation").removeClass("is-disabled")})),$("#start-conversation").on("click",(function(){$(".chat-header .is-autocomplete").removeClass("is-hidden"),$("#users-autocpl").focus(),$(".chat-body li:not(.no-messages):not(.chat-loader)").remove(),$(".chat-body .no-messages").removeClass("is-hidden"),$("#messages-sidebar ul li").removeClass("is-active"),"development"==env?$(".chat-side #user-details-image").attr("src","assets/img/avatars/placeholder.jpg"):$(".chat-side #user-details-image").attr("src","https://via.placeholder.com/150x150"),$(".chat-side").find(".user-name, .info, .user-skills, .user-job-title").empty()})),$(".chat-header .hide").on("click",(function(){$(".chat-header .is-autocomplete input").val(""),$(".chat-header .is-autocomplete").addClass("is-hidden")})),$.ajax({url:"assets/data/conversation1.json",dataType:"json",success:function(a){var s="",e=(feather.icons.clock.toSvg(),feather.icons.link.toSvg()),n=feather.icons.maximize.toSvg(),i=feather.icons["download-cloud"].toSvg();for(var t in a.messages){var l=a.messages[t];for(var c in l){"msg"==l[c].type?s='\n                            <li class="'+l[c].sender+'">\n                                <div class="avatar">\n                                    <img src="'+l[c].avatar+'" draggable="false"/>\n                                </div>\n                                <div class="msg">\n                                    <div class="msg-inner">\n                                        <p>'+l[c].content.text+"</p>\n                                    </div>\n                                    \n                                    <time>\n                                        "+l[c].content.time+"\n                                    </time>\n                                </div>\n                            </li>\n                        ":"system"==l[c].type?s='\n                            <li class="divider-container">\n                                <div class="divider">\n                                    <span>'+l[c].content.text+"</span>\n                                </div>\n                            </li>\n                        ":"imagelink"==l[c].type?s='\n                            <li class="'+l[c].sender+'">\n                                <div class="avatar">\n                                    <img src="'+l[c].avatar+'" draggable="false"/>\n                                </div>\n                                <div class="msg is-link-image">\n                                    <figure class="image">\n                                        <img src="'+l[c].content.link_image+'">\n                                        <div class="link-badge">\n                                            <img src="'+l[c].content.link_badge+'">\n                                        </div>\n                                    </figure>\n                                    <div class="link-body">\n                                        <span class="link-title">'+l[c].content.text+"</span>\n                                        <small>"+l[c].content.subtext+"</small>\n                                    </div>\n                                </div>\n                            </li>\n                        ":"image"==l[c].type?s='\n                                <li class="'+l[c].sender+'">\n                                    <div class="avatar is-online">\n                                        <img src="'+l[c].avatar+'" draggable="false"/>\n                                    </div>\n                                    <div class="msg is-image">\n                                        <div class="image-container">\n                                            <img src="'+l[c].content.image_url+'">\n                                            <div class="image-overlay"></div>\n                                            <div class="image-actions">\n                                                <div class="actions-inner">\n                                                    <div class="action">\n                                                        '+i+'\n                                                    </div>\n                                                    <a href="'+l[c].content.image_url+'" class="action messaging-popup">\n                                                        '+n+"\n                                                    </a>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </li>\n                            ":"link"==l[c].type&&(s='\n                            <li class="'+l[c].sender+'">\n                                <div class="avatar is-online">\n                                    <img src="'+l[c].avatar+'" draggable="false"/>\n                                </div>\n                                <div class="msg is-link">\n                                    <div class="icon-wrapper">\n                                        '+e+'\n                                    </div>\n                                    <p class="link-meta">\n                                        <span>'+l[c].content.text+'</span>\n                                        <a href="#">'+l[c].content.subtext+"</a>\n                                    </p>\n                                </div>\n                            </li>\n                        "),$("#chat-body").append(s);var d=$(".chat-body");d.scrollTop(d.prop("scrollHeight"))}}}})}));