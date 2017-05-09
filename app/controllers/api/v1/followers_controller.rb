class Api::V1::FollowersController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @users = User.all
    render json: @users
  end

end
