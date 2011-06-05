
require 'dm-core'

module PoieticGen

	class User

		include DataMapper::Resource

		property :id,	Serial
		property :session,	String, :required => true
		property :name,	String, :required => true
		property :zone, Integer, :required => true
		property :created_at,	DateTime, :required => true
		property :expires_at, DateTime, :required => true
	end

end
