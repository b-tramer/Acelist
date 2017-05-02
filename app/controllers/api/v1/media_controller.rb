class Api::V1::MediaController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @media = Media.all
    @user = current_user
    respond_to do |format|
      format.json  { render :json => {:media => @media, :user => @user }}
    end
  end

  def create
    @media = Media.create(media_params)
    render json: @media
  end

  def destroy
    @media = Media.destroy(params[:id])
    render json: @media
  end

  private

  def media_params
    params.permit(:title, :data_id, :overview, :poster_path, :release_date)
  end
end
