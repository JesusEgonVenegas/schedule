require 'sinatra'
require 'json'

get '/' do
  'Hello world!'
end

get '/shifts' do
  response['Access-Control-Allow-Origin'] = '*'
  # Specify the content type to return, json
  content_type :json
  file = File.read('shifts.json')
  shifts = JSON.parse(file)

  sort_param = params['sort_by']
  if sort_param == 'first_name'
    shifts.sort_by! do |shift|
      shift['name'].split.first.downcase
    end
  elsif sort_param == 'last_name'
    shifts.sort_by! do |shift|
      shift['name'].split.last.downcase
    end
  end
  shifts.to_json
end
