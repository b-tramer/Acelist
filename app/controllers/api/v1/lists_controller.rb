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

  def create
    @list = List.create(list_params)
    render json: @list
  end

  private

  def list_params
    params.require(:list).permit(
    :name, :user_id,
    media_attributes: [ :id, :title, :data_id, :overview, :poster_path, :release_date, :created_at, :updated_at ]
    )
  end
end
