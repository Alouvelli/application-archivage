import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';
import { ProfileInfo } from './profile-info.model';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private infoUrl = SERVER_API_URL + 'management/info';
    private profileInfo: Promise<ProfileInfo> | null = null;

    constructor(private http: HttpClient) {}

    getProfileInfo(): Promise<ProfileInfo> {
        if (!this.profileInfo) {
            this.profileInfo = lastValueFrom(
                this.http
                .get<ProfileInfo>(this.infoUrl, { observe: 'response' })
                .pipe(
                    map((res: HttpResponse<ProfileInfo>) => {
                        const data = ((res.body as unknown) ?? {}) as Record<string, unknown>;
                        const pi = new ProfileInfo();
                        const activeProfiles = (data['activeProfiles'] as string[]) ?? [];
                        pi.activeProfiles = activeProfiles;
                        const ribbonSetting = (data['display-ribbon-on-profiles'] as string) ?? '';
                        const displayRibbonOnProfiles = ribbonSetting ? ribbonSetting.split(',') : [];
                        if (pi.activeProfiles) {
                            const ribbonProfiles = displayRibbonOnProfiles.filter((profile: string) =>
                                pi.activeProfiles.includes(profile)
                            );
                            if (ribbonProfiles.length !== 0) {
                                pi.ribbonEnv = ribbonProfiles[0];
                            }
                            pi.inProduction = pi.activeProfiles.includes('prod');
                            pi.swaggerEnabled = pi.activeProfiles.includes('swagger');
                        }
                        return pi;
                    })
                )
            );
        }
        return this.profileInfo;
    }
}
