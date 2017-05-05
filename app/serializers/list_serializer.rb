class ListSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id
  has_many :media, through: :media_lists
end
