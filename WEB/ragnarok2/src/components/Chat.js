import React, { Component } from 'react';
import '../css/chat.css';

// import { Container } from './styles';

export default class Chat extends Component {
  render() {
    return (
        <div class="container-fluid h-100">
			<div class="row justify-content-center h-100">
				<div class="col-md-4 col-xl-3 chat"><div class="card card-chat mb-sm-3 mb-md-0 contacts_card">
					<div class="card-header card-header-chat">
						<div class="input-group">
							<input type="text" placeholder="Search..." name="" class="form-control search-chat"/>
							<div class="input-group-prepend">
								<span class="input-group-text search_btn-chat"><i class="fas fa-search"></i></span>
							</div>
						</div>
					</div>
					<div class="card-body contacts_body-chat">
						<ui class="contacts-chat">
						<li class="active-chat">
							<div class="d-flex bd-highlight">
								<div class="img_cont-chat">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img-chat"/>
									<span class="online_icon-chat"></span>
								</div>
								<div class="user_info-chat">
									<span>Khalid</span>
									<p>Kalid is online</p>
								</div>
							</div>
						</li>
						<li>
							<div class="d-flex bd-highlight">
								<div class="img_cont-chat">
									<img src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg" class="rounded-circle user_img-chat"/>
									<span class="online_icon-chat offline-chat"></span>
								</div>
								<div class="user_info-chat">
									<span>Taherah Big</span>
									<p>Taherah left 7 mins ago</p>
								</div>
							</div>
						</li>
						<li>
							<div class="d-flex bd-highlight">
								<div class="img_cont-chat">
									<img src="https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg" class="rounded-circle user_img-chat"/>
									<span class="online_icon-chat"></span>
								</div>
								<div class="user_info-chat">
									<span>Sami Rafi</span>
									<p>Sami is online</p>
								</div>
							</div>
						</li>
						<li>
							<div class="d-flex bd-highlight">
								<div class="img_cont-chat">
									<img src="http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg" class="rounded-circle user_img-chat"/>
									<span class="online_icon-chat offline-chat"></span>
								</div>
								<div class="user_info-chat">
									<span>Nargis Hawa</span>
									<p>Nargis left 30 mins ago</p>
								</div>
							</div>
						</li>
						<li>
							<div class="d-flex bd-highlight">
								<div class="img_cont-chat">
									<img src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg" class="rounded-circle user_img-chat"/>
									<span class="online_icon-chat offline-chat"></span>
								</div>
								<div class="user_info-chat">
									<span>Rashid Samim</span>
									<p>Rashid left 50 mins ago</p>
								</div>
							</div>
						</li>
						</ui>
					</div>
					<div class="card-footer card-footer-chat"></div>
				</div></div>
				<div class="col-md-8 col-xl-6 chat">
					<div class="card">
						<div class="card-header card-header-chat msg_head-chat">
							<div class="d-flex bd-highlight">
								<div class="img_cont-chat">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img-chat"/>
									<span class="online_icon-chat"></span>
								</div>
								<div class="user_info-chat">
									<span>Chat with Khalid</span>
									<p>1767 Messages</p>
								</div>
								<div class="video_cam-chat">
									<span><i class="fas fa-video"></i></span>
									<span><i class="fas fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn-chat"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu-chat">
								<ul>
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div class="card-body msg_card_body">
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg-chat">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg-chat"/>
								</div>
								<div class="msg_cotainer-chat">
									Hi, how are you samim?
									<span class="msg_time-chat">8:40 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_cotainer_send-chat">
									Hi Khalid i am good tnx how about you?
									<span class="msg_time_send-chat">8:55 AM, Today</span>
								</div>
								<div class="img_cont_msg-chat">
							        <img src=""></img>
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg-chat">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg-chat"/>
								</div>
								<div class="msg_cotainer-chat">
									I am good too, thank you for your chat template
									<span class="msg_time-chat">9:00 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_cotainer_send-chat">
									You are welcome
									<span class="msg_time_send-chat">9:05 AM, Today</span>
								</div>
								<div class="img_cont_msg-chat">
							        <img></img>
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg-chat">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg-chat"/>
								</div>
								<div class="msg_cotainer-chat">
									I am looking for your next templates
									<span class="msg_time-chat">9:07 AM, Today</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4">
								<div class="msg_cotainer_send-chat">
									Ok, thank you have a good day
									<span class="msg_time_send-chat">9:10 AM, Today</span>
								</div>
								<div class="img_cont_msg-chat">
						            <img></img>
								</div>
							</div>
							<div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg-chat">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg-chat"/>
								</div>
								<div class="msg_cotainer-chat">
									Bye, see you
									<span class="msg_time-chat">9:12 AM, Today</span>
								</div>
							</div>
						</div>
						<div class="card-footer card-footer-chat">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn-chat"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea name="" class="form-control type_msg-chat" placeholder="Type your message..."></textarea>
								<div class="input-group-append">
									<span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
  }
}
