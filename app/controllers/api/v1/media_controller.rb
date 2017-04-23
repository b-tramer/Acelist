class Api::V1::MediaController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @media = Media.all
    render json: @media
  end

  def create
    @media = Media.create(media_params)
    render json: @media
  end

  def destroy
    @media = Media.destroy(params[:id])
    render json: @media
  end

  def update
  end

  private

  def media_params
    params.permit(:title, :data_id, :overview, :poster_path, :release_date)
  end
end
