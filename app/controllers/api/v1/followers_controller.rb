class Api::V1::FollowersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @current_user = current_user
    respond_to do |format|
      format.json  { render :json => {:current_user => @current_user}}
    end
  end

  def show
    @user = User.find(params[:id])

    @followers = []
    @user.followers.each do |user|
      @followers << User.find(user.user_id)
    end

    @following = []
    @user.followings.each do |user|
      @following << User.find(user.following_id)
    end

    respond_to do |format|
      format.json  { render :json => {:followers => @followers, :following => @following }}
    end
  end

  def create
    @follow = Follower.create(user_id: current_user.id, following_id: params[:following_id])
    render json: @follow
  end

  def destroy
    @follow = Follower.find_by(user_id: current_user.id, following_id: params[:id])
    @follow.destroy
    render json: @follow
  end

  private

  def follower_params
    params.permit(:following_id)
  end

end
