#!/bin/bash

# Errors and logz
set -e

# Install ES plugins specified in ELASTICSEARCH_PLUGINS.
elasticsearch_install_plugins() {
    read -r -a plugins_list <<<"$(tr ',;' ' ' <<<"$ELASTICSEARCH_PLUGINS")"
    local mandatory_plugins=""

    # Helper function for extracting the plugin name from a tarball name
    # Examples:
    #   get_plugin_name plugin -> plugin
    #   get_plugin_name file://plugin.zip -> plugin
    #   get_plugin_name http://plugin-0.1.2.zip -> plugin
    get_plugin_name() {
        local plugin="${1:?missing plugin}"
        # Remove any paths, and strip both the .zip extension and the version
        basename "$plugin" | sed -E -e 's/.zip$//' -e 's/-[0-9]+\.[0-9]+(\.[0-9]+){0,}$//'
    }

    # Skip if there isn't any plugin to install
    [[ -z "${plugins_list[*]:-}" ]] && return

    # Install plugins
    debug "Installing plugins: ${plugins_list[*]}"
    for plugin in "${plugins_list[@]}"; do
        plugin_name="$(get_plugin_name "$plugin")"
        [[ -n "$mandatory_plugins" ]] && mandatory_plugins="${mandatory_plugins},${plugin_name}" || mandatory_plugins="$plugin_name"

        # Check if the plugin was already installed
        if [[ -d "${ELASTICSEARCH_PLUGINS_DIR}/${plugin_name}" ]]; then
            debug "Plugin already installed: ${plugin}"
            continue
        fi

        debug "Installing plugin: ${plugin}"
        elasticsearch-plugin install -b -v "$plugin"
    done
 
}

# @TODO: replace this with Dockerfile build process in 4.x
elasticsearch_install_plugins
docker-entrypoint.sh
