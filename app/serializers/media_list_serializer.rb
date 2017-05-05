class MediaListSerializer < ActiveModel::Serializer
  attributes :media
  def media
    object.media
  end
end
