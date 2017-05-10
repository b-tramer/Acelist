class Api::V1::MediaController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @media = Media.all
    render json: @media
  end

  def create
    @media = Media.create(media_params)
    render json: @media
  end

  def destroy
    if Media.find_by(id: params[:id]).nil?
      media = Media.find_by(data_id: params[:id])
      mediaId = media.id
      @mediaList = MediaList.find_by(list_id: params[:listId], media_id: mediaId)
      @mediaList.destroy
      render json: @mediaList
    else
      @mediaList = MediaList.find_by(list_id: params[:listId], media_id: params[:id])
      @mediaList.destroy
      render json: @mediaList
    end
  end

  private

  def media_params
    params.permit(:title, :data_id, :overview, :poster_path, :release_date)
  end
end
