class Location < ActiveRecord::Base
  attr_accessible :lat, :lng, :user_id

  belongs_to :user
end
