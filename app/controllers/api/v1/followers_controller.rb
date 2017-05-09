class Api::V1::FollowersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])

    @followers = []
    @user.followers.each do |user|
      @followers << User.find(user.user_id)
    end

    @following = []
    @user.followings.each do |user|
      @followers << User.find(user.following_id)
    end

    respond_to do |format|
      format.json  { render :json => {:followers => @followers, :following => @following }}
    end
  end

  def create
    @follow = Follower.create(user_id: current_user.id, following_id: params[:following_id])
    render json: @follow
  end

  private

  def follower_params
    params.permit(:following_id)
  end

end
