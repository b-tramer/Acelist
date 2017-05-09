class FollowerSerializer < ActiveModel::Serializer
  attributes :user_id
  belongs_to :user
end
