package org.yescola.gestion.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CorsFilter;
import org.yescola.gestion.security.AuthoritiesConstants;
import org.yescola.gestion.security.jwt.JWTFilter;
import org.yescola.gestion.security.jwt.TokenProvider;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;
import tech.jhipster.config.JHipsterProperties;

@Configuration
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration {

    private final Logger log = LoggerFactory.getLogger(SecurityConfiguration.class);

    private final JHipsterProperties jHipsterProperties;
    private final TokenProvider tokenProvider;
    private final CorsFilter corsFilter;
    private final SecurityProblemSupport problemSupport;

    public SecurityConfiguration(
        TokenProvider tokenProvider,
        JHipsterProperties jHipsterProperties,
        CorsFilter corsFilter,
        SecurityProblemSupport problemSupport
    ) {
        this.tokenProvider = tokenProvider;
        this.jHipsterProperties = jHipsterProperties;
        this.corsFilter = corsFilter;
        this.problemSupport = problemSupport;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Déclarez explicitement le bean AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public JWTFilter jwtFilter() {
        return new JWTFilter(tokenProvider);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.debug("Configuring Spring Security filter chain");

        http
            .csrf(csrf -> csrf.disable())
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(handling -> handling
                .authenticationEntryPoint(problemSupport)
                .accessDeniedHandler(problemSupport)
            )
            .headers(headers -> headers
                .contentSecurityPolicy(csp -> csp.policyDirectives(jHipsterProperties.getSecurity().getContentSecurityPolicy()))
                .referrerPolicy(referrer -> referrer.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
                .frameOptions(FrameOptionsConfig::deny)
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(
                    "/",
                    "/index.html",
                    "/favicon.ico",
                    "/*.js",
                    "/*.css",
                    "/*.map",
                    "/*.json",
                    "/*.png",
                    "/*.jpg",
                    "/*.gif",
                    "/*.svg",
                    "/*.woff2",
                    "/*.woff",
                    "/*.ttf"
                ).permitAll()
                // ✅ SECTION 1 : Ressources statiques (DOIT être en premier)
                .requestMatchers(AntPathRequestMatcher.antMatcher("/")).permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/index.html")).permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/app/**")).permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/i18n/**")).permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/content/**")).permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/swagger-ui/**")).permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/test/**")).permitAll()

                // ✅ SECTION 2 : API publiques
                .requestMatchers("/api/authenticate").permitAll()
//                .requestMatchers("/api/account").permitAll() // ⚠️ AJOUT CRITIQUE
                .requestMatchers("/api/register").permitAll()
                .requestMatchers("/api/activate").permitAll()
                .requestMatchers("/api/account/reset-password/init").permitAll()
                .requestMatchers("/api/account/reset-password/finish").permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/public/**")).permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/profile-info")).permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/config/**")).permitAll()

                // ✅ SECTION 3 : Management endpoints
                .requestMatchers("/management/health").permitAll()
                .requestMatchers("/management/info").permitAll()
                .requestMatchers(AntPathRequestMatcher.antMatcher("/management/**"))
                .hasAuthority(AuthoritiesConstants.ADMIN)

                // ✅ SECTION 4 : API authentifiées (DOIT être en dernier)
                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/**")).authenticated()
            );
        return http.build();
    }
}
