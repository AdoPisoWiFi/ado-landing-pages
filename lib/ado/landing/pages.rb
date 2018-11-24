require "ado/landing/pages/version"

module Ado
  module Landing
    module Pages
      class Error < StandardError; end
      # Your code goes here...

      module AdoLandingPagesHelper

        def flash_class(level)
          case level.to_sym
          when :notice then "alert alert-info"
          when :info then "alert alert-info"
          when :success then "alert alert-success"
          when :warning then "alert alert-warning"
          when :error then "alert alert-danger"
          when :alert then "alert alert-danger"
          end
        end

        def controller?(*controller)
          controller.include?(params[:controller])
        end

        def action?(*action)
          action.include?(params[:action])
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
