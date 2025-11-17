package org.yescola.gestion.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Gestion Ecole.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link tech.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final Http http = new Http();

    public Http getHttp() {
        return http;
    }

    public static class Http {
        private Version version = Version.V_1_1;

        public Version getVersion() {
            return version;
        }

        public void setVersion(Version version) {
            this.version = version;
        }

        public enum Version {
            V_1_1,
            V_2_0
        }
    }
}
