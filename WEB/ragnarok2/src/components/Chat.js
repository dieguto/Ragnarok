import React, { Component } from 'react';
import '../css/chat.css';
import DtUtils from "../Utils/DtUtils"

import io from 'socket.io-client';
import api from '../services/api';

const token = sessionStorage.getItem("token");

const opcoes = {
	query: {
		token: token
	}
};

const socket = io('http://localhost:3108', opcoes);


// import { Container } from './styles';

export default class Chat extends Component {
	constructor(){
		super();
		this.state = {
			response: false,
			endpoint: 'http://localhost:3107',
			chats: [],
			mensagens_anteriores: [],
			usuario: {nome:"Clique a esquerda para abrir um chat ;)"},
			info_chat: {c_foto:"fotos/padrao.jpg"}
		}
		
	}

	componentDidMount(){
		socket.on("erro", erro => {
			alert(erro)
		})

		 socket.emit('get_chats');

		 socket.on('chats', info_chats => {
			 console.log(info_chats);
			 this.setState({chats:info_chats});
		 })
	}

	iniciarChat(id_chat){

	
		socket.off("iniciou");

		socket.off("mensagens_anteriores");


		console.log(id_chat)
		var iniciar_chat = {
			id_chat: id_chat
		}

		socket.emit('iniciar_chat',iniciar_chat);

		socket.on('iniciou', info_chat => {
			console.log("conectado!")
			console.log(info_chat);
			this.setState({usuario:info_chat.usuario})
			
			this.setState({info_chat})

		 });

		 socket.on("mensagens_anteriores", msgs_ant => {
			 this.setState({mensagens_anteriores: msgs_ant})
		 })
	}

	carregarMensagem(mensagem){
		if(mensagem.is_para_usuario){
			return(
				<div class="d-flex justify-content-start mb-4">
					
					<div class="msg_cotainer-chat">
						{mensagem.mensagem}
						<span class="msg_time-chat">{DtUtils.getDt(mensagem.enviada_em).string}</span>
					</div>
				</div>
			);
		} else {
			return(
				<div class="d-flex justify-content-end mb-4">
					<div class="msg_cotainer_send-chat">
						{mensagem.mensagem}
						<span class="msg_time_send-chat">{DtUtils.getDt(mensagem.enviada_em).string}</span>
					</div>
					{/* <div class="img_cont_msg-chat">
						<img></img>
					</div> */}
				</div>
			);
		}
	}
	
	render() {
    return (
        <div class="container-fluid h-100 mt-5 mb-5">
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
						{
							this.state.chats.map(chat => {
								return(
									
									<li class="active-chat" >
										<div class="d-flex bd-highlight" onClick={() => this.iniciarChat(chat.id_chat)}>
											<div class="img_cont-chat">
												<img src={api + "/" + chat.c_foto} class="rounded-circle user_img-chat"/>
												{
													(() => {
														if(chat.usuario.is_online){
															return <span class="online_icon-chat"></span>;
														} else {
															return <span class="online_icon-chat offline-chat"></span>
														}
													})()
												}
											</div>
											<div class="user_info-chat">
												<span>{chat.usuario.nome}</span>
												<p>{chat.usuario.nome} está {chat.usuario.is_online ? "online" : "offline"}</p>
											</div>
										</div>
									</li>

								);
							})
						}
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
						
						<li >
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
						
						</ui>
					</div>
					<div class="card-footer card-footer-chat"></div>
				</div></div>
				<div class="col-md-8 col-xl-6 chat">
					<div class="card">
						<div class="card-header card-header-chat msg_head-chat">
							<div class="d-flex bd-highlight">
								<div class="img_cont-chat">
									<img src={api + "/" + this.state.info_chat.c_foto} class="rounded-circle user_img-chat"/>
									{
										(() => {
											if(this.state.usuario.is_online){
												return <span class="online_icon-chat"></span>;
											} else {
												return <span class="online_icon-chat offline-chat"></span>
											}
										})()
									}
								</div>
								<div class="user_info-chat">
									<span>{this.state.usuario.nome}</span>
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
							
							
							{

								this.state.mensagens_anteriores.map(msg => {
									const c = new Chat();

									return c.carregarMensagem(msg);
								})

							}
							
							
						</div>
						<div class="card-footer card-footer-chat">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn-chat"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea name="" class="form-control type_msg-chat pl-0" placeholder="Digite sua mensagem..."></textarea>
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
