FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { SecureRandom.base64(32) }
  end
end
