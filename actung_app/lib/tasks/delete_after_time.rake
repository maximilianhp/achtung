require 'rake/dsl_definition'
require 'rake'

desc "Update all feeds present in the database"
task :update_feeds => :environment do
  Entry.update_all_feeds
end
