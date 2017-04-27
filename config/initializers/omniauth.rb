OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '211987322632148', 'cef659066db7a74f47f7a18deaa8e66a', :scope => 'name,email,picture,public_profile'
end
