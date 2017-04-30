class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @lists = List.where(user_id: current_user.id)
    @media = @lists[0].media
    # @media = []
    # @lists.each do |list|
    #   @media << Media.where(id: list.id)
    # end
    @current_user = current_user
    respond_to do |format|
      format.json  { render :json => {:lists => @lists, :user => @current_user, :media => @media }}
    end
  end

  def show
    @user = current_user
    render json: @user
  end

end
