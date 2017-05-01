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

  def update
  end

  private

  def media_params
    params.permit(:title, :data_id, :overview, :poster_path, :release_date)
  end
end


# def media_attributes=(attributes)
#   self.media << attributes.map { |item| Media.where(title: item[:title], data_id: item[:id], overview: item[:overview], poster_path: item[:poster_path], release_date: item[:release_date], created_at: item[:created_at], updated_at: item[:updated_at]).first_or_create }
#   super
# end
#
#
# def media_attributes=(attributes)
#   binding.pry
#   if Media.find(attributes.last['id'])
#     self.media << attributes.map { |item| Media.find(item[:id]) }
#   else
#     self.media << attributes.map { |item| Media.where(title: item[:title], data_id: item[:id], overview: item[:overview], poster_path: item[:poster_path], release_date: item[:release_date], created_at: item[:created_at], updated_at: item[:updated_at]).first_or_create }
#   end
#   super
# end
