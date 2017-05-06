class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

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
    @current = current_user
    @mediaList = MediaList.all
    respond_to do |format|
      format.json  { render :json => {:lists => @lists, :user => @user, :current => @current }}
    end
  end

  def create
    if params[:_json].length == 0
      @users = User.all
      render json: @users
    elsif params[:_json]
      query = params[:_json]
      @users = User.where("name ilike ?", "%#{query}%")
      respond_to do |format|
        format.json  { render :json => {:user => @users }}
      end
    end

  end

end
