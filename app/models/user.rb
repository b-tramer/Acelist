class User < ActiveRecord::Base

  has_many :lists
  accepts_nested_attributes_for :lists

  has_many :followers, foreign_key: :following_id, class_name: 'Follower'
  has_many :followings, foreign_key: :user_id, class_name: 'Follower'

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.image = auth.info.image
      user.email = auth.info.email
      user.city = auth.info.city
      user.state = auth.info.state
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

end
