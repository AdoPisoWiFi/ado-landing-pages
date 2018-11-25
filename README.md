# Ado::Landing::Pages

Provides layouts and views for landing pages.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'jquery-rails'
gem 'toastr-rails'
gem "devise-bootstrap-views", "~> 1.0"
gem 'ado-landing-pages', git: "https://github.com/AdoPisoWiFi/ado-landing-pages"
```

Define view helpers for `app_name` and `support_email` methods.

And then execute:

    $ bundle

## Usage

`application_controller.rb`
```ruby

layout 'layouts/ado-landing-pages'
```

Overriding default headers and footers, otherwise default headers and footers in `app/views/ado-landing-pages/partials` will be displayed.

```ruby

<% content_for :head do %>
  <style>.additional-styles{}</style>
<% end %>

<% content_for :header do %>
  <%= render 'ado-landing-pages/partials/intro_header' %>
<% end %>

<% content_for :content do %>
  <%= render 'ado-landing-pages/partials/intro' %>
  <%= render 'ado-landing-pages/partials/about' %>
  <%= render 'ado-landing-pages/partials/features' %>
  <%= render 'ado-landing-pages/partials/how_it_works' %>
  <%= render 'ado-landing-pages/partials/buy_now' %>
<% end %>

<% content_for :footer do %>
  <%= render 'ado-landing-pages/partials/footer' %>
<% end %>

<% content_for :javascripts do %>
  <script>alert("hello");</script>
<% end %>

```
## Development

After checking out the repo, run `bin/setup` to install dependencies. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/ado-landing-pages.
