class CreateTableLocationsUsers < ActiveRecord::Migration
  def change
    create_table :locations_users do |t|
      t.belongs_to :location
      t.belongs_to :user
    end
  end
end