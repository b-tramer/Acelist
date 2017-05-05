class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @users = User.all
    @current_user = current_user
    respond_to do |format|
      format.json  { render :json => {:users => @users, :current_user => @current_user}}
    end
  end

  def show
    @lists = List.where(user_id: params[:id])
    @media = []
    @lists.each do |list|
      list.media.each do |item|
        @media << item
      end
    end
    @user = User.where(id: params[:id])
    @mediaList = MediaList.all
    respond_to do |format|
      format.json  { render :json => {:lists => @lists, :user => @user }}
    end
  end

end
