class MediaController < ApplicationController

  def index
    @media = Media.new
    @medias = Media.all
  end

  def show
    @media = Media.find(params[:id])
  end

  def create
    @media = Media.new(media_params)
    if @media.save!
      flase[:notice] = "Title added."
      redirect_to media_path(@media)
    else
      flase[:error] = @media.errors.full_messages.join('. ')
      render
    end
  end

  private

  def media_params
    params.require(:media).permit(:title, :data_id, :overview, :poster_path, :release_date)
  end
end
