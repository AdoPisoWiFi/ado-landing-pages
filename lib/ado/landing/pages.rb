require "ado/landing/pages/version"

module Ado
  module Landing
    module Pages
      class Error < StandardError; end
      # Your code goes here...

      module AdoLandingPagesHelper

        def toastr_method(level)
          case level.to_sym
          when :notice then "info"
          when :info then "info"
          when :success then "success"
          when :warning then "warning"
          when :error then "error"
          when :alert then "error"
          end
        end

        def controller?(*controller)
          controller.include?(params[:controller])
        end

        def action?(*action)
          action.include?(params[:action])
        end

        def app_name
          ENV["APP_NAME"] || 'changeme@ado-landing-pages/lib/pages.rb'
        end

        def support_email
          ENV["SUPPORT_EMAIL"] || 'changeme@ado-landing-pages/lib/pages.rb'
        end

      end

      module Rails
        class Engine < ::Rails::Engine
        end
      end

      ActionView::Base.send :include, AdoLandingPagesHelper

    end
  end
end
