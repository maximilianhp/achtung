class Location < ActiveRecord::Base
  validates :lat, presence: true
  validates :lng, presence: true
  validates :user_id, presence: true
  
  attr_accessible :lat, :lng, :user_id

  belongs_to :user
end
