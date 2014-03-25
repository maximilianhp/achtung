class User < ActiveRecord::Base
  before_validation :set_default_role

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name, :role
  # validates :email, presence: true, uniquness: true

  has_many :locations do
    def today
      where(:created_at => (Time.now.beginning_of_day..Time.now))
    end

    def this_week
      where(:created_at => (Time.now.beginning_of_week..Time.now))
    end
  end

  def role?(role)
    self.role.to_s == role.to_s
  end

  private
  def set_default_role
    self.role ||= "user"
  end

end
