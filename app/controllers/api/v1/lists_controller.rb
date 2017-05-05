class Api::V1::ListsController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def show
    @list = List.find(params[:id])
    @media = @list.media
    respond_to do |format|
      format.json  { render :json => {:list => @list, :media => @media }}
    end
  end

  def create
    if List.find_by(name: params[:list][:name].titleize).nil?
      @list = List.new(list_params)
      @list.name = @list.name.titleize
      @list.save
      render json: @list
    else
      update
    end
  end

  def update
    @list = List.find_by(name: params[:list][:name].titleize)
    newList = List.new(list_params)
    @list.media.replace(newList.media)
    render json: @list
  end

  def destroy
    @list = List.destroy(params[:id])
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
