require 'rake/dsl_definition'
require 'rake'

desc "Update all feeds present in the database"
task :delete_after_time => :environment do
  Model.where('created_at > ?', 15.minutes.ago).each do |location|
      location.destroy
    end
end