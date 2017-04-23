class Api::V1::ListsController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: User.find(1)
  end

  def show
    user = User.find(1)
    render json: user
  end


end
