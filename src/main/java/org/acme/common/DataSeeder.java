package org.acme.common;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.transaction.Transactional;
import org.acme.Champion;
import org.acme.login.User;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@ApplicationScoped
public class DataSeeder {

    @Transactional
    public void onStart(@Observes StartupEvent ev) {
        // 12주차: guest 비밀번호도 SHA-256 해시로 저장 (로그인 시 클라이언트 해시와 비교)
        String guestHash = sha256("123123");

        if (User.count() == 0) {
            User guest = new User();
            guest.username = "guest";
            guest.password = guestHash;
            guest.email = "guest@example.com";
            guest.phone = "010-0000-0000";
            guest.persist();
        } else {
            // 기존 guest가 평문으로 남아있다면 해시값으로 1회 마이그레이션
            User guest = User.findByUsername("guest");
            if (guest != null && guest.password != null
                    && guest.password.length() != 64) {
                guest.password = guestHash;
                if (guest.email == null)  guest.email = "guest@example.com";
                if (guest.phone == null)  guest.phone = "010-0000-0000";
            }
        }

        if (Champion.count() == 0) {
            persistChampion("아트록스", "전사",       "탑");
            persistChampion("사일러스", "마법사",     "정글/미드");
            persistChampion("애니비아", "마법사",     "미드");
            persistChampion("브라이어", "전사",       "정글");
            persistChampion("잭스",     "전사",       "탑");
            persistChampion("징크스",   "원거리딜러", "원딜");
            persistChampion("야스오",   "전사",       "미드/탑");
            persistChampion("리신",     "전사",       "정글");
            persistChampion("티모",     "마법사",     "탑");
            persistChampion("케인",     "암살자",     "정글");
            persistChampion("루시안",   "원거리딜러", "원딜/미드");
        }
    }

    private void persistChampion(String name, String role, String line) {
        Champion c = new Champion();
        c.name = name;
        c.role = role;
        c.line = line;
        c.persist();
    }

    private static String sha256(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] bytes = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte b : bytes) hex.append(String.format("%02x", b));
            return hex.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
