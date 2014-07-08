class Location < ActiveRecord::Base
  validates :lat, presence: true
  validates :lng, presence: true
  validates :user_id, presence: true
  
  attr_accessible :lat, :lng, :user_id

  belongs_to :user

  validate :user_quota, :on => :create

  def user_quota
    if user.locations.today.count >= 10
      errors.add(:base, "Exceeds daily limit")
    elsif  user.locations.this_week.count >= 30
      errors.add(:base, "Exceeds weekly limit")
    end
  end  
end