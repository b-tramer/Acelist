class MediaList < ActiveRecord::Base
  belongs_to :media
  belongs_to :list
end
